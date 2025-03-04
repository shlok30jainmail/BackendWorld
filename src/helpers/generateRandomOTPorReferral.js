
// generate random referral code
export const generateReferralCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let referralCode = "";
    for (let i = 0; i < 7; i++) {
      referralCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return referralCode;
  };


  // generate random otp
  export const generateOtp = () => {
    const characters =
      "0123456789";
    let otp = "";
    for (let i = 0; i < 4; i++) {
      otp += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return otp;
  };