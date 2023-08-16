const { message } = require('antd');
const moment = require('moment');

exports.welcomeEmail = (name, expiryDate, PackageDescription) => {
  return `
    <!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Password Reset</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }

    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }

  /**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  /**
   * Remove extra space added to tables and cells in Outlook.
   */
  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }

  /**
   * Better fluid images in Internet Explorer.
   */
  img {
    -ms-interpolation-mode: bicubic;
  }

  /**
   * Remove blue links for iOS devices.
   */
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }

  /**
   * Fix centering issues in Android 4.4.
   */
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }

  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /**
   * Collapse table borders to avoid space between cells.
   */
  table {
    border-collapse: collapse !important;
  }

  a {
    color: #1a82e2;
  }

  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">

  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 36px 24px;">
              <a href="https://ptptips.com.au" target="_blank" style="display: inline-block;">
              </a>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf; background-color: #142841; border-top-left-radius: 10px; border-top-right-radius:10px;">
                <div style="text-align: center;">
                    <img style="text-align: center;" src="https://i.ibb.co/ftcFPSN/favicon.png" alt="Logo" border="0" width="80px" style="display: block; min-width: 48px;">
                </div>
              <h1 style="margin: 0; font-size: 32px; font-weight: 600; letter-spacing: -1px; line-height: 48px; text-align: center; color:white">CONGRATULATIONS ${name}!</h1>
              <h1 style="margin: 0; font-size: 32px; font-weight: 500; letter-spacing: -1px; line-height: 48px; text-align: center; color:white">You have successfully signed up to</h1>
              <h1 style="margin: 0; font-size: 32px; font-weight: 500; letter-spacing: -1px; line-height: 48px; text-align: center; color:#44bd32; margin-bottom: 24px;">PAST THE POST TIPS</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <tr>
            <td align="center" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              
                <h4 style="text-align: center; margin-top: 8px; ">Your ${PackageDescription} free trial is valid until:</h4>
                <h5 style="text-align: center; color:#44bd32; margin-top: -17px; font-size: 16px;">${moment(expiryDate).format('DD/MM/YYYY')}</h5>
            </td>
          </tr>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <h4 style="margin: 0;">REMEMBER TO ALWAYS GAMBLE RESPONSIBLY</h4>
            </td>
          </tr>

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                <a href="https://facebook.com/PTPTIPSAU"><img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png" width="32" height="32"/></a>
                <a href="https://www.instagram.com/ptptips/"><img style="margin-right: 8px; margin-left: 8px;" style="margin-left: 8;" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-512.png" width="32" height="32"/></a>
                <a href="https://twitter.com/PTPTIPS"><img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter2_colored_svg-512.png" width="32" height="32"/></a>
            </td>
          </tr>

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;"><a href="https://ptptips.com.au" target="_blank" style="color: #44bd32;">www.ptptips.com.au</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>`
}

exports.resetPassword = (link) => {
  return `
  <!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Password Reset</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
  @media screen {
    @font-face {
      font-family: 'sans-serif';
      font-style: normal;
      font-weight: 400;
      src: local('sans-serif Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }

    @font-face {
      font-family: 'sans-serif';
      font-style: normal;
      font-weight: 700;
      src: local('sans-serif Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }

  /**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  /**
   * Remove extra space added to tables and cells in Outlook.
   */
  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }

  /**
   * Better fluid images in Internet Explorer.
   */
  img {
    -ms-interpolation-mode: bicubic;
  }

  /**
   * Remove blue links for iOS devices.
   */
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }

  /**
   * Fix centering issues in Android 4.4.
   */
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }

  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /**
   * Collapse table borders to avoid space between cells.
   */
  table {
    border-collapse: collapse !important;
  }

  a {
    color: #1a82e2;
  }

  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">

  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 36px 24px;">
              <a href="https://ptptips.com.au" target="_blank" style="display: inline-block;">
              </a>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf; background-color: #142841; border-top-left-radius: 10px; border-top-right-radius:10px;">
                <div style="text-align: center;">
                    <img style="text-align: center;" src="https://i.ibb.co/ftcFPSN/favicon.png" alt="Logo" border="0" width="80px" style="display: block; min-width: 48px;">
                </div>
              <h1 style="margin: 0; font-size: 32px; font-weight: 500; letter-spacing: -1px; line-height: 48px; text-align: center; color:white">Past The Post</span> Tips</h1>
              <h1 style="margin: 0; font-size: 32px; font-weight: 300; letter-spacing: -1px; line-height: 48px; text-align: center; color:white; margin-bottom: 16px;">Reset your password</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                <div style="background-color: #EAEDF3; padding-top: 24px; padding-bottom: 16px; border-radius: 10px;">
                    <div style="text-align: center;">
                        <h2 style="text-align: center; margin-top: -8px; line-height: 40px; font-weight: 400; font-size: 20px;">Hi, Looks like you’re having some trouble logging in.
                          <br/>Click Reset Password below. You will be redirected back to the PTP Tips website where you can set a new password for your account.</h2>
                    </div>
                  <div style="text-align: center;">

                    <div style="text-align: center; margin-bottom: 16px; margin-top: 32px;">
                      <a href="${link}" style="background-color: #44bd32; border-radius: 8px; color: white; padding-left: 24px; padding-right: 24px; padding-top: 13px; padding-bottom: 13px; cursor: pointer; text-decoration: none;">
                        Reset Password
                      </a>
                  </div>
                   <div style="margin-top: 28px;">
                    <span style="margin-top: 100px; text-align: center;">The PTP Tips Team</span>
                   </div>
                  </div>
                </div>
            </td>
          </tr>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <h4 style="margin: 0;">REMEMBER TO ALWAYS GAMBLE RESPONSIBLY</h4>
            </td>
          </tr>

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'sans-serif', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                <a href="https://facebook.com/PTPTIPSAU"><img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png" width="32" height="32"/></a>
                <a href="https://www.instagram.com/ptptips/"><img style="margin-right: 8px; margin-left: 8px;" style="margin-left: 8;" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-512.png" width="32" height="32"/></a>
                <a href="https://twitter.com/PTPTIPS"><img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter2_colored_svg-512.png" width="32" height="32"/></a>
            </td>
          </tr>

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'sans-serif', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin-top: -24px;"><a href="https://ptptips.com.au" target="_blank" style="color: #44bd32;">www.ptptips.com.au</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

exports.policyUpdate = (link) => {
  return `
  <!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Password Reset</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap" rel="stylesheet">
  <style type="text/css">
  /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }

    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }

  /**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  /**
   * Remove extra space added to tables and cells in Outlook.
   */
  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }

  /**
   * Better fluid images in Internet Explorer.
   */
  img {
    -ms-interpolation-mode: bicubic;
  }

  /**
   * Remove blue links for iOS devices.
   */
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }

  /**
   * Fix centering issues in Android 4.4.
   */
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }

  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /**
   * Collapse table borders to avoid space between cells.
   */
  table {
    border-collapse: collapse !important;
  }

  a {
    color: #1a82e2;
  }

  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">

  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: Poppins; border-top: 3px solid #d4dadf; background-color: #142841; border-top-left-radius: 10px; border-top-right-radius:10px;">
                <div style="text-align: center;">
                    <img style="text-align: center;" src="https://i.ibb.co/ftcFPSN/favicon.png" alt="Logo" border="0" width="80px" style="display: block; min-width: 48px;">
                </div>
              <h1 style="margin: 0; font-size: 32px; font-weight: 500; letter-spacing: -1px; line-height: 48px; text-align: center; color:white; margin-bottom: 16px;">Past The Post</span> Tips</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family:Poppins; font-size: 16px; line-height: 24px;">
                    <div style="text-align: center; padding: 8px;">
                        <h4 style="text-align: Left; margin-top: -8px; font-weight: 400; line-height: 28px;">
                            Dear<strong> User,</strong><br/>
                            We are continuing to develop more features on our website and mobile apps that you will love. To address these changes, we've updated our <a style="color: #44bd32;" href="https://ptptips.com.au/policy">Terms Of Use</a>. These will take effect Thursday 15th October, 2020 so please take some time to review them. <br/> <br/>Using our mobile apps, or websites after that date will indicate your agreement to be bound by the new Terms of Use.
                            <br/>
                            Here is a <a href="https://ptptips.com.au/policy" style="color: #44bd32;">link</a> to our updated Terms of Use.
                            <br/>
                            <br/>
                            The Past The Post Team
                        </h4>
                    </div>
            </td>
          </tr>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: Poppins; font-size: 14px; line-height: 20px; color: #666;">
              <h4 style="margin: 0;">REMEMBER TO ALWAYS GAMBLE RESPONSIBLY</h4>
            </td>
          </tr>

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                <a href="https://facebook.com/PTPTIPSAU"><img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png" width="32" height="32"/></a>
                <a href="https://www.instagram.com/ptptips/"><img style="margin-right: 8px; margin-left: 8px;" style="margin-left: 8;" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-512.png" width="32" height="32"/></a>
                <a href="https://twitter.com/PTPTIPS"><img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter2_colored_svg-512.png" width="32" height="32"/></a>
            </td>
          </tr>

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;"><a href="https://ptptips.com.au" target="_blank" style="color: #44bd32;">www.ptptips.com.au</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
  `
}

exports.selections = () => {
  return `
  <!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Password Reset</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap" rel="stylesheet">
  <style type="text/css">
  /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }

    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }

  /**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  /**
   * Remove extra space added to tables and cells in Outlook.
   */
  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }

  /**
   * Better fluid images in Internet Explorer.
   */
  img {
    -ms-interpolation-mode: bicubic;
  }

  /**
   * Remove blue links for iOS devices.
   */
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }

  /**
   * Fix centering issues in Android 4.4.
   */
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }

  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /**
   * Collapse table borders to avoid space between cells.
   */
  table {
    border-collapse: collapse !important;
  }

  a {
    color: #1a82e2;
  }

  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">

  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 36px 24px;">
              <a href="https://ptptips.com.au" target="_blank" style="display: inline-block;">
              </a>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: Poppins; border-top: 3px solid #d4dadf; background-color: #142841; border-top-left-radius: 10px; border-top-right-radius:10px;">
                <div style="text-align: center;">
                    <img style="text-align: center;" src="https://i.ibb.co/ftcFPSN/favicon.png" alt="Logo" border="0" width="80px" style="display: block; min-width: 48px;">
                </div>
              <h1 style="margin: 0; font-size: 32px; font-weight: 500; letter-spacing: -1px; line-height: 48px; text-align: center; color:white; margin-bottom: 16px;">Past The Post</span> Tips</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <tr>
            <td align="center" bgcolor="#ffffff" style="padding: 24px; font-family:Poppins; font-size: 16px; line-height: 24px;">
                    <div style="text-align: center; padding: 8px;">
                        <h4 style="text-align: center; margin-top: -8px; font-weight: 400; line-height: 28px;">
                            Dear<strong> User,</strong><br/>
                            Today's Selections have now been generated <br/>and uploaded to the website.<br/>
                            <br/>
                            <span style="margin-top: -16px;">Have a look and good luck.</span><br/>

                            <div style="text-align: center; margin-bottom: 16px; margin-top: 24px;">
                              <a href="https://ptptips.com.au/selections" style="background-color: #44bd32; border-radius: 8px; color: white; padding-left: 24px; padding-right: 24px; padding-top: 13px; padding-bottom: 13px; cursor: pointer; text-decoration: none;">Go To Selections</a>
                            </div>
          
                            <br/>
                            The PTP Tips Team
                        </h4>
                    </div>
            </td>
          </tr>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: Poppins; font-size: 14px; line-height: 20px; color: #666;">
              <h4 style="margin: 0;">REMEMBER TO ALWAYS GAMBLE RESPONSIBLY</h4>
            </td>
          </tr>

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                <a href="https://facebook.com/PTPTIPSAU"><img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png" width="32" height="32"/></a>
                <a href="https://www.instagram.com/ptptips/"><img style="margin-right: 8px; margin-left: 8px;" style="margin-left: 8;" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-512.png" width="32" height="32"/></a>
                <a href="https://twitter.com/PTPTIPS"><img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter2_colored_svg-512.png" width="32" height="32"/></a>
            </td>
          </tr>

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;"><a href="https://ptptips.com.au" target="_blank" style="color: #44bd32;">www.ptptips.com.au</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
  `
}

exports.afterReset = (link) => {
  return `
  <!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Password Reset</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
  @media screen {
    @font-face {
      font-family: 'sans-serif';
      font-style: normal;
      font-weight: 400;
      src: local('sans-serif Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }

    @font-face {
      font-family: 'sans-serif';
      font-style: normal;
      font-weight: 700;
      src: local('sans-serif Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }

  /**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  /**
   * Remove extra space added to tables and cells in Outlook.
   */
  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }

  /**
   * Better fluid images in Internet Explorer.
   */
  img {
    -ms-interpolation-mode: bicubic;
  }

  /**
   * Remove blue links for iOS devices.
   */
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }

  /**
   * Fix centering issues in Android 4.4.
   */
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }

  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /**
   * Collapse table borders to avoid space between cells.
   */
  table {
    border-collapse: collapse !important;
  }

  a {
    color: #1a82e2;
  }

  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">

  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 36px 24px;">
              <a href="https://ptptips.com.au" target="_blank" style="display: inline-block;">
              </a>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf; background-color: #142841; border-top-left-radius: 10px; border-top-right-radius:10px;">
                <div style="text-align: center;">
                    <img style="text-align: center;" src="https://i.ibb.co/ftcFPSN/favicon.png" alt="Logo" border="0" width="80px" style="display: block; min-width: 48px;">
                </div>
              <h1 style="margin: 0; font-size: 32px; font-weight: 500; letter-spacing: -1px; line-height: 48px; text-align: center; color:white">Past The Post</span> Tips</h1>
              <h1 style="margin: 0; font-size: 32px; font-weight: 300; letter-spacing: -1px; line-height: 48px; text-align: center; color:white; margin-bottom: 16px;">Password Reset</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; padding-left: 8px; padding-right: 8px; ">
                <div style="background-color: #EAEDF3; padding-top: 24px; padding-bottom: 16px; border-radius: 10px;">
                    <div style="text-align: center;">
                        <h2 style="text-align: center; margin-top: -8px; line-height: 40px; font-weight: 400;">Your PTP Tips Password was successfully changed<br/></h2>
                        <div style="padding:8px;">
                          <span style="font-size: 18px;">If you did not perform this action, Please <a style="color: #44bd32" href="https://ptptips.com.au/contactus">Contact Us</a>.</span>
                        </div>
                        <div style="margin-top: 28px;">
                          <span style="margin-top: 100px; text-align: center;">The PTP Tips Team</span>
                         </div>
                    </div>
                  <div style="text-align: center;">
                  </div>
                </div>
            </td>
          </tr>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <h4 style="margin: 0;">REMEMBER TO ALWAYS GAMBLE RESPONSIBLY</h4>
            </td>
          </tr>

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'sans-serif', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                <a href="https://facebook.com/PTPTIPSAU"><img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png" width="32" height="32"/></a>
                <a href="https://www.instagram.com/ptptips/"><img style="margin-right: 8px; margin-left: 8px;" style="margin-left: 8;" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-512.png" width="32" height="32"/></a>
                <a href="https://twitter.com/PTPTIPS"><img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter2_colored_svg-512.png" width="32" height="32"/></a>
            </td>
          </tr>

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'sans-serif', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;"><a href="https://ptptips.com.au" target="_blank" style="color: #44bd32;">www.ptptips.com.au</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

exports.verify = (link) => {
  return `
  <!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Password Reset</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
  @media screen {
    @font-face {
      font-family: 'sans-serif';
      font-style: normal;
      font-weight: 400;
      src: local('sans-serif Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }

    @font-face {
      font-family: 'sans-serif';
      font-style: normal;
      font-weight: 700;
      src: local('sans-serif Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }

  /**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  /**
   * Remove extra space added to tables and cells in Outlook.
   */
  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }

  /**
   * Better fluid images in Internet Explorer.
   */
  img {
    -ms-interpolation-mode: bicubic;
  }

  /**
   * Remove blue links for iOS devices.
   */
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }

  /**
   * Fix centering issues in Android 4.4.
   */
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }

  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /**
   * Collapse table borders to avoid space between cells.
   */
  table {
    border-collapse: collapse !important;
  }

  a {
    color: #1a82e2;
  }

  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">

  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf; background-color: #142841; border-top-left-radius: 10px; border-top-right-radius:10px;">
                <div style="text-align: center;">
                    <img style="text-align: center;" src="https://i.ibb.co/ftcFPSN/favicon.png" alt="Logo" border="0" width="80px" style="display: block; min-width: 48px;">
                </div>
              <h1 style="margin: 0; font-size: 32px; font-weight: 500; letter-spacing: -1px; line-height: 48px; text-align: center; color:white">Past The Post</span> Tips</h1>
              <h1 style="margin: 0; font-size: 24px; font-weight: 300; letter-spacing: -1px; line-height: 48px; text-align: center; color:white; margin-bottom: 16px;">Verify your Email Adddress</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                <div style="background-color: #EAEDF3; padding-top: 24px; padding-bottom: 16px; border-radius: 10px;">
                    <div style="text-align: center;">
                        <h2 style="text-align: center; margin-top: -8px; line-height: 40px; font-weight: 400;"><span style="color:#142841; font-weight: 700;">Nearly There!</span><br/>We just need to verify if its you, please confirm<br/> your Email Address down below.</h2>
                    </div>
                  <div style="text-align: center;">

                <div style="text-align: center; margin-bottom: 16px;">
                    <a href="${link}" style="background-color: #44bd32; border-radius: 8px; color: white; padding-left: 24px; padding-right: 24px; padding-top: 13px; padding-bottom: 13px; cursor: pointer; text-decoration: none;">Verify</a>
                </div>
                  </div>
                </div>
            </td>
          </tr>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <h4 style="margin: 0;">REMEMBER TO ALWAYS GAMBLE RESPONSIBLY</h4>
            </td>
          </tr>

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'sans-serif', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                <a href="https://facebook.com/PTPTIPSAU"><img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png" width="32" height="32"/></a>
                <a href="https://www.instagram.com/ptptips/"><img style="margin-right: 8px; margin-left: 8px;" style="margin-left: 8;" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-512.png" width="32" height="32"/></a>
                <a href="https://twitter.com/PTPTIPS"><img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter2_colored_svg-512.png" width="32" height="32"/></a>
            </td>
          </tr>

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'sans-serif', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;"><a href="https://ptptips.com.au" target="_blank" style="color: #44bd32;">www.ptptips.com.au</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
  `
}

exports.contactUs = (name, message) => {
  return `
  <!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Contact Us</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
  @media screen {
    @font-face {
      font-family: 'sans-serif';
      font-style: normal;
      font-weight: 400;
      src: local('sans-serif Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }

    @font-face {
      font-family: 'sans-serif';
      font-style: normal;
      font-weight: 700;
      src: local('sans-serif Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }

  /**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  /**
   * Remove extra space added to tables and cells in Outlook.
   */
  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }

  /**
   * Better fluid images in Internet Explorer.
   */
  img {
    -ms-interpolation-mode: bicubic;
  }

  /**
   * Remove blue links for iOS devices.
   */
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }

  /**
   * Fix centering issues in Android 4.4.
   */
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }

  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /**
   * Collapse table borders to avoid space between cells.
   */
  table {
    border-collapse: collapse !important;
  }

  a {
    color: #1a82e2;
  }

  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">

  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf; background-color: #142841; border-top-left-radius: 10px; border-top-right-radius:10px;">
                <div style="text-align: center;">
                    <img style="text-align: center;" src="https://i.ibb.co/ftcFPSN/favicon.png" alt="Logo" border="0" width="80px" style="display: block; min-width: 48px;">
                </div>
              <h1 style="margin: 0; font-size: 32px; font-weight: 500; letter-spacing: -1px; line-height: 48px; text-align: center; color:white">Past The Post</span> Tips</h1>
              <h1 style="margin: 0; font-size: 24px; font-weight: 300; letter-spacing: -1px; line-height: 48px; text-align: center; color:white; margin-bottom: 16px;">Your message has been received ${name}!</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <tr>
            <td align="center" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                <div style="text-align: center;">
                    <h2 style="text-align: center; margin-top: -8px; line-height: 40px; font-weight: 400;"><span style="color:#142841; font-weight: 700;">Please expect a response from us <br/>within 48 hours.</span><br/><span style="font-size: 16px;">Your Message:</span></h2>
                </div>
                <div style="background-color: #EAEDF3; padding-top: 24px; padding-bottom: 16px; border-radius: 10px; padding-left: 40px; padding-right: 40px;">
                   
                  <div style="text-align: center;">

                   <span>${message}</span>
                  </div>
                </div>
                <div style="margin-top: 24px;">
                    <strong>Thank you for using PTP Tips</strong>
                </div>
            </td>
          </tr>
      </td>
    </tr>

    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <h4 style="margin: 0;">REMEMBER TO ALWAYS GAMBLE RESPONSIBLY</h4>
              <p style="margin: 0;">PAST THE POST TEAM</p>
            </td>
          </tr>

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'sans-serif', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                <a href="https://facebook.com/PTPTIPSAU"><img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png" width="32" height="32"/></a>
                <a href="https://www.instagram.com/ptptips/"><img style="margin-right: 8px; margin-left: 8px;" style="margin-left: 8;" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-512.png" width="32" height="32"/></a>
                <a href="https://twitter.com/PTPTIPS"><img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter2_colored_svg-512.png" width="32" height="32"/></a>
            </td>
          </tr>

          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'sans-serif', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;"><a href="https://ptptips.com.au" target="_blank" style="color: #44bd32;">www.ptptips.com.au</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
  `
}



exports.notification = (name, venue, raceNumber, link) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
  
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Password Reset</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
    /**
     * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
     */
    @media screen {
      @font-face {
        font-family: 'sans-serif';
        font-style: normal;
        font-weight: 400;
        src: local('sans-serif Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
      }
  
      @font-face {
        font-family: 'sans-serif';
        font-style: normal;
        font-weight: 700;
        src: local('sans-serif Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
      }
    }
  
    /**
     * Avoid browser level font resizing.
     * 1. Windows Mobile
     * 2. iOS / OSX
     */
    body,
    table,
    td,
    a {
      -ms-text-size-adjust: 100%; /* 1 */
      -webkit-text-size-adjust: 100%; /* 2 */
    }
  
    /**
     * Remove extra space added to tables and cells in Outlook.
     */
    table,
    td {
      mso-table-rspace: 0pt;
      mso-table-lspace: 0pt;
    }
  
    /**
     * Better fluid images in Internet Explorer.
     */
    img {
      -ms-interpolation-mode: bicubic;
    }
  
    /**
     * Remove blue links for iOS devices.
     */
    a[x-apple-data-detectors] {
      font-family: inherit !important;
      font-size: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      color: inherit !important;
      text-decoration: none !important;
    }
  
    /**
     * Fix centering issues in Android 4.4.
     */
    div[style*="margin: 16px 0;"] {
      margin: 0 !important;
    }
  
    body {
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    }
  
    /**
     * Collapse table borders to avoid space between cells.
     */
    table {
      border-collapse: collapse !important;
    }
  
    a {
      color: #1a82e2;
    }
  
    img {
      height: auto;
      line-height: 100%;
      text-decoration: none;
      border: 0;
      outline: none;
    }
    </style>
  
  </head>
  <body style="background-color: #e9ecef;">
  
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
  
      <tr>
        <td align="center" bgcolor="#e9ecef">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
              <td align="center" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf; background-color: #142841; border-top-left-radius: 10px; border-top-right-radius:10px;">
                  <div style="text-align: center;">
                      <img style="text-align: center;" src="https://i.ibb.co/ftcFPSN/favicon.png" alt="Logo" border="0" width="80px" style="display: block; min-width: 48px;">
                  </div>
                <h1 style="margin: 0; font-size: 32px; font-weight: 500; letter-spacing: -1px; line-height: 48px; text-align: center; color:white">Past The Post</span> Tips</h1>
              </td>
            </tr>
          </table>
        </td>
      </tr>
  
      <tr>
        <td align="center" bgcolor="#e9ecef">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
  
            <tr>
              <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <div style="background-color: #EAEDF3; padding: 16px; border-radius: 10px;">
                         <div style="text-align:center;">
                           <p>Dear ${name}, Reminder for the upcoming race:</p> 
                           <p style="font-size:24px;"><strong>${venue} ${raceNumber}</strong></p>
                         </div>
                         
                         <div style="text-align: center; margin-bottom: 16px; margin-top: 32px;">
                           <a href="${link}" style="background-color: #44bd32; border-radius: 8px; color: white; padding-left: 24px; padding-right: 24px; padding-top: 13px; padding-bottom: 13px; cursor: pointer; text-decoration: none;">Go to Race</a>
                        </div>
                  </div>
                  </div>
              </td>
            </tr>
        </td>
      </tr>
  
      <tr>
        <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
  
            <tr>
              <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                <h4 style="margin: 0;">REMEMBER TO ALWAYS GAMBLE RESPONSIBLY</h4>
                <p style="margin: 0;">PAST THE POST TEAM</p>
              </td>
            </tr>
  
            <tr>
              <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'sans-serif', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                  <a href="https://facebook.com/PTPTIPSAU"><img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png" width="32" height="32"/></a>
                  <a href="https://www.instagram.com/ptptips/"><img style="margin-right: 8px; margin-left: 8px;" style="margin-left: 8;" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-512.png" width="32" height="32"/></a>
                  <a href="https://twitter.com/PTPTIPS"><img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter2_colored_svg-512.png" width="32" height="32"/></a>
              </td>
            </tr>
  
            <tr>
              <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'sans-serif', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                <p style="margin: 0;"><a href="https://ptptips.com.au" target="_blank" style="color: #44bd32;">www.ptptips.com.au</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  `
}
