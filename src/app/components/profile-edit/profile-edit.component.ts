import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { loginAuthService } from '../../services/login-auth.service';
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css',
})
export class ProfileEditComponent implements AfterContentInit {
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

  get firstName() {
    return this.profileForm.get('firstName');
  }
  get lastName() {
    return this.profileForm.get('lname');
  }
  get arName() {
    return this.profileForm.get('arName');
  }
  get enname() {
    return this.profileForm.get('enName');
  }
  get dob() {
    return this.profileForm.get('dob');
  }
  get nationality() {
    return this.profileForm.get('nationality');
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
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: loginAuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required, Validators.minLength(3)],
      lastName: ['', Validators.required, Validators.minLength(3)],
      arName: ['', Validators.required, Validators.minLength(3)],
      enName: [
        '',
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^([A-Za-z]{3,})(\s[A-Za-z]{3,}){1,}$/),
      ],
      dob: ['', Validators.required],
      nationality: ['', Validators.required],
      gender: ['', Validators.required],
      fullAddress: ['', Validators.required],
      social: [''],
    });
  }
  selectCountry(country: any) {
    this.selectedCountry = country.target.value;
  }
  switchPage(page: string) {
    this.currentPage = page;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.userService.updateProfile(this.profileForm.value).subscribe(
        (response) => {
          console.log('Profile updated successfully', response);
        },
        (error) => {
          console.error('Profile update failed', error);
        }
      );
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
