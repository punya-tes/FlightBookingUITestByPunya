const chai = require('chai');
let travelBookingId ;
let travelCardNumber;
let authenticationCode;

describe('Test Flight Booking Functionality', () => {
    it('Test1 - User could able to select flight and do payment ', () => {
          browser.url('https://blazedemo.com/');
          let header1 = $('h1').getText();
          console.log("On Page: "+header1);
          console.log("Lets Travel from Paris to Rome");
          $('[name="fromPort"]').selectByVisibleText('Paris');
          $('[name="toPort"]').selectByVisibleText('Rome');
          browser.pause(3000);
          $('input[type=submit]').click();
          let header2 = $('h3').getText();
          console.log("On Page: "+header2);
          console.log("Selecting Luftansa Airlines") ;
          $('(//table/tbody/tr/td/input)[5]').click();
          browser.pause(3000);
          let header3 = $('h2').getText();
          console.log("On Page: "+header3);
          console.log("Lets submit passanger Details ");
          $('#inputName').setValue('Punya');
          $('#address').setValue('45 TILAK ROAD');
          $('#city').setValue('MUMBAI');
          $('#state').setValue('MAHARASHTRA');
          $('#zipCode').setValue('410206');
          browser.pause(3000);
          $('#cardType').selectByVisibleText('Visa');
          $('#creditCardNumber').setValue('873420197821');
          $('#creditCardMonth').setValue('10');
          $('#creditCardYear').setValue('2024');
          $('#nameOnCard').setValue('Punyai Thulapule');
          $('input[value="Purchase Flight"]').click();
          let finalHeader = $('h1').getText();
          console.log("On Page: "+finalHeader);
           travelBookingId = $('//table/tbody/tr/td[2]').getText();
           travelCardNumber = $('//table/tbody/tr[4]/td[2]').getText();
           authenticationCode = $('//table/tbody/tr[6]/td[2]').getText();

     });
      it('Test2 - Verify Booking Id Generated for User',()=>{
        console.log("Verify Id ");
        chai.assert.isNotNull(travelBookingId, 'There is some issue in booking because bookingId is null')
         
      });
      it('Test3 - Verify Booking details shows - Encrypted Card number ',()=>{
        console.log("Verify Id ");
        chai.assert.include(travelCardNumber, 'xxx' ,'Card number is not encrypted')
         
      });
      it('Test4 - Verify authenticationCode is generated and displayed in Booking details ',()=>{
        console.log("Verify Id ");
        chai.assert.isNotNull(authenticationCode, 'authenticationCode is not generated')
         
      });
    });