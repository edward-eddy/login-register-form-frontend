import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { loginAuthService } from '../../services/login-auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css',
})
export class ProfileEditComponent implements AfterContentInit, OnInit {
  nationalities = [
    'جزائري',
    'بحريني',
    'مصري',
    'عراقي',
    'أردني',
    'كويتي',
    'لبناني',
    'ليبي',
    'مغربي',
    'عماني',
    'قطري',
    'سعودي',
    'سوداني',
    'سوري',
    'تونسي',
    'إماراتي',
    'يمني',
    'فلسطيني',
    'موريتاني',
    'صومالي',
    'جيبوتي',
    'جزر القمر',
  ];
  arabCountries: string[] = [
    'مصر',
    'الجزائر',
    'البحرين',
    'جزر القمر',
    'جيبوتي',
    'العراق',
    'الأردن',
    'الكويت',
    'لبنان',
    'ليبيا',
    'المغرب',
    'موريتانيا',
    'عمان',
    'فلسطين',
    'قطر',
    'المملكة العربية السعودية',
    'الصومال',
    'السودان',
    'سوريا',
    'تونس',
    'اليمن',
    'الإمارات العربية المتحدة',
  ];
  selectedCountry = '';
  egyptCities: string[] = [
    'القاهرة',
    'الإسكندرية',
    'الجيزة',
    'السويس',
    'الأقصر',
    'أسوان',
    'شرم الشيخ',
    'الغردقة',
    'المنصورة',
    'طنطا',
  ];
  algeriaCities: string[] = [
    'الجزائر العاصمة',
    'وهران',
    'قسنطينة',
    'عنابة',
    'باتنة',
    'البليدة',
    'سطيف',
    'تلمسان',
    'تيزي وزو',
    'بجاية',
  ];
  bahrainCities: string[] = [
    'المنامة',
    'المحرق',
    'الرفاع',
    'سترة',
    'عالي',
    'مدينة عيسى',
    'مدينة حمد',
    'الحد',
    'البديع',
    'الدراز',
  ];
  arrOfAllCities = [this.egyptCities, this.algeriaCities, this.bahrainCities];
  socialMediaLinks: any = {
    LinkedIn: { username: '', link: '' },
    Github: { username: '', link: '' },
    Behance: { username: '', link: '' },
    Dribble: { username: '', link: '' },
    Facebook: { username: '', link: '' },
    Instagram: { username: '', link: '' },
    X: { username: '', link: '' },
    Youtube: { username: '', link: '' },
    Blogger: { username: '', link: '' },
    TikTok: { username: '', link: '' },
    Website: { username: '', link: '' },
    other: { username: '', link: '' },
  };
  socialMediaKeys = Object.keys(this.socialMediaLinks);
  isPersonalInfo: boolean = true;
  profileForm: FormGroup;
  currentPage: string = 'personal-info';
  userFormDetails: any;

  get firstName() {
    return this.profileForm.get('firstName');
  }
  get lastName() {
    return this.profileForm.get('lastName');
  }
  get arName() {
    return this.profileForm.get('arName');
  }
  get enName() {
    return this.profileForm.get('enName');
  }
  get dob() {
    return this.profileForm.get('dob');
  }
  get nationality() {
    return this.profileForm.get('nationality');
  }
  get country() {
    return this.profileForm.get('country');
  }
  get city() {
    return this.profileForm.get('city');
  }
  get gender() {
    return this.profileForm.get('gender');
  }
  get fullAddress() {
    return this.profileForm.get('fullAddress');
  }
  get social() {
    return this.profileForm.get('social');
  }
  get bref() {
    return this.profileForm.get('bref');
  }
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: loginAuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      arName: ['', [Validators.required, Validators.minLength(3)]],
      enName: ['', [Validators.required, Validators.minLength(3)]],
      dob: ['', Validators.required],
      nationality: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      gender: ['', Validators.required],
      fullAddress: ['', Validators.required],
      bref: [''],
      social: [{}],
    });
  }
  selectCountry(country: any) {
    this.selectedCountry = country.target.value;
  }
  switchPage(page: string) {
    this.currentPage = page;
  }

  onSubmit() {
    if (!this.profileForm.valid) {
      this.profileForm.markAllAsTouched();
      const keys = Object.keys(this.profileForm.controls);
      for (let i = 0; i < keys.length; i++) {
        // console.log(keys[i], this.profileForm.get(keys[i]).valid);
        if (this.profileForm.get(keys[i]).invalid) {
          this.toastr.error(`${keys[i]} is not valid`, 'Invalid input');
        }
      }
    }
    if (this.profileForm.valid) {
      this.userService.updateProfile(this.profileForm.value).subscribe({
        next: (data) => {
          this.toastr.success('Profile edited successfully');
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          // console.log(err);
          this.toastr.error(err.error.message, 'Error');
        },
      });
    }
  }
  onSave() {
    console.log(JSON.stringify(this.socialMediaLinks));
    // this.profileForm.setValue({
    //   social: JSON.stringify(this.socialMediaLinks)
    // })
    console.log(JSON.stringify(this.profileForm));
  }
  ngAfterContentInit(): void {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        menuItems.forEach((i) => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }
  ngOnInit(): void {
    this.userService.getUserById().subscribe({
      next: ({ data }) => {
        const {
          firstName,
          lastName,
          arName,
          enName,
          dob,
          nationality,
          country,
          city,
          gender,
          fullAddress,
          bref,
          social,
        } = data;
        this.userFormDetails = data;
        this.profileForm.setValue({
          firstName,
          lastName,
          arName,
          enName,
          dob,
          nationality,
          country,
          city,
          gender,
          fullAddress,
          bref,
          social,
        });
        this.selectedCountry = country
      },
      error: (err) => {
        console.log('error ===========>', err);
      },
    });
  }
  pInfoShow() {
    this.isPersonalInfo = true;
  }
  cInfoShow() {
    this.isPersonalInfo = false;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
