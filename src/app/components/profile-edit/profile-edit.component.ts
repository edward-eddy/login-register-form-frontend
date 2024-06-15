import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css',
})
export class ProfileEditComponent implements OnInit {
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
  countiesAndCities = [];
  cities = [];
  selectedCountry: any;
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
  // currentPage: string = 'personal-info';
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
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.userService.getCountries().subscribe({
      next: (data)=>{
        this.countiesAndCities = data.data;
      }
    })

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
    this.selectedCountry = this.countiesAndCities.find(
      (ele) => ele.country === country.target.value
    );
    this.cities = this.selectedCountry.cities;
  }
  // switchPage(page: string) {
  //   this.currentPage = page;
  // }

  onSubmit() {
    if (!this.profileForm.valid) {
      this.profileForm.markAllAsTouched();
      const keys = Object.keys(this.profileForm.controls);
      for (let i = 0; i < keys.length; i++) {
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
    this.social.setValue(this.socialMediaLinks);
    this.onSubmit();
  }

  ngOnInit() {
    // fetching countries from api
    // await this.httpClient
    //   .get('https://countriesnow.space/api/v0.1/countries')
    //   .subscribe({
    //     next: (data: any) => {
    //       this.countiesAndCities = data.data;
    //     },
    //   });
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
        this.socialMediaLinks = social;
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
        this.selectedCountry = country;
        // assign countries to the variables
        this.selectedCountry = this.countiesAndCities.find(
          (ele) => ele.country === country
        );
        this.cities = this.selectedCountry.cities;
      },
      error: (err) => {
        console.log('error ===========>', err);
      },
    });
  }
  perAndConInfoShow(isPersonalInfo) {
    this.isPersonalInfo = isPersonalInfo;
  }
}
