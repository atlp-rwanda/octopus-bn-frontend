export const profileMockData = {
    payload:{
       firstName: 'OCTOPUSBN',
       lastName: 'Octopus',
       gender: 'other',
       birthDate: '01-01-1995',
       preferedLang: 'en',
       preferedCurrency: 'US',
       residence: 'Kigali',
       department: 'IT',
       imageUrl: 'https://www.google.com/profile.gif',
       bio: 'I like to travel a round the globe',
       passportNumber:"RK0884756"
     },
     invalidPayload:{
      firstName: 'OCTOPUSBN',
      lastName: 'Octopus',
      gender: 'malemm',
      birthDate: '01-01-1995',
      preferedLang: 'en',
      preferedCurrency: 'US',
      residence: 'Kigali',
      department: 'IT',
      imageUrl: 'https://www.google.com/profile.gif',
      bio: 'I like to travel a round the globe',
      passportNumber:"RK0884756"
    },
     responseOnSuccess: {
        status: 200,
        message: 'Your profile is updated successfully',
        data:{
            firstName: 'OCTOPUSBN',
            lastName: 'Octopus',
            gender: 'other',
            birthDate: '2020-02-18T07:02:55.101Z',
            preferedLang: 'en',
            preferedCurrency: 'US',
            residence: 'Kigali',
            department: 'IT',
            imageUrl: 'https://www.google.com/profile.gif',
            bio: 'I like to travel a round the globe',
            passportNumber:"RK0884756"
          }
       },
       successAction: {
        loading: false,
        isUpdated: true,
        message: 'Your profile is updated successfully'
      },
      failureAction: {
        loading: false,
        isUpdated: false,
        error:{
          status: 22,
          message:[
          "Gender is invalid"
       ]}
      },
     token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9jdG9wdXNibkBnbWFpbC5jb20iLCJwcmVmZXJlZExhbmciOiJlbiIsImlhdCI6MTU4ODEwOTc2OCwiZXhwIjoxNTg4NzE0NTY4fQ.TQ-GjWcpckCIexuN3zldaT3-8ernA8lHDOYBlzyBfOo'
}
