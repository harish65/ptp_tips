import React, { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Link,
    Typography,
} from "@material-ui/core";

const NoticeDialog = ({ separator }) => {

    const [open, toggleOpen] = useState(false);
    const [dialog, setDialog] = useState("legal");

    const clickHandler = (event) => {
        event.preventDefault();
        setDialog(event.target.name);
        toggleOpen(true);
    };

    const contentObject = {
        legal: {
            name: "legal",
            title: "Legal Notice",
            description: () => <>This website is owned and operated by Past the Post team.<br />
                <br />To contact us: support@ptptips.com.au<br />
                <br />Address line: 24/15 cavill Avenue, surfers paradise,
                <br />postcode city: 4217
                <br />country: Australia<br /></>
        },
        privacy: {
            name: "privacy",
            title: "Privacy Notice",
            description: () => <>
                <strong>Cookies </strong><br />
						This site uses "cookies". Cookies are files which are sent by us to your computer which
						we can access when you visit our site in future. We do this so that we can remember your
						settings such as your username for the members area. We do not use cookies to store personal
						information and we do not use cookies to track you. The cookies we use are mostly "session"
						cookies, which are used to customise the look and feel of the site for your own custom preference.
                        If you wish to find out more about "cookies" you may find the AboutCookies.org site informative.
                        <br />
                <strong>Subscribers</strong><br />
						As a subscriber to ptptips.com.au we will need to collect basic information about you.
						This information is used solely for the purpose of subscriber administration so that
						we can allow you access to the subscriber features. The information we hold will be
						accurate and up to date. You can check the information that we hold about you by emailing us.
						If you find any inaccuracies we will delete or correct it promptly. The personal information
						which we hold will be held securely in accordance with our internal security policy and current
						international law. We will never pass on any information to third parties unless required to do so by the government.
                {/*The present website, including all information and materials contained on it, are managed and controlled by _________, ADDRESS.<br /><br />
                Our contact details are provided on our Legal Notice.<br /><br />
                The terms and conditions set out in this Privacy Notice apply in conjunction with the more detailed Privacy Policies.<br /><br />
                <Typography variant="h6">Our Commitment</Typography>
                We are committed to respecting and ensuring the privacy of all the users of this website.<br />
                We will be transparent about the purposes for which we collect data, including personal data, and about the kinds of data we collect and how we use them.<br /><br />
                <Typography variant="h6">Your Consent</Typography>
                By using this website, you consent to the terms of this Privacy Notice.<br />
                We may change the terms of this Notice and these Policies from time to time.<br />
                If such changes are made, we will promptly place notices on all the websites so that you can be aware of those changes.<br /><br />
                Your continued use of this websites subsequent to such notified changes will mean that you accept those changes, and will be on the terms of this Privacy Notice and those Privacy Policies, as amended from time to time.<br /><br />
                What types of information do we collect and store?<br /><br />
                <Typography variant="h6">Personal Information</Typography>
                You can access most of the pages on the website without telling us who you are and without revealing any personal information.<br /><br />
                We do not collect personal information (such as your name, address, phone number or e-mail address, or other personal details) on the website unless you choose to provide them.<br />
                For example, where you express an interest in joining or donating to one of our organizations, subscribe to our email updates, or buy a book or CD or DVD, we will often provide you with an online form that you can fill in and submit online.<br />
                In all these cases, we will inform you of the purpose of the form (unless that is obvious) and provide you with options as concerns the uses of the data (see below: "Your Rights: Right to object").<br />
                We only collect personal information that is relevant and adequate and not excessive for the purposes in question.<br /><br />
                Non-personal, aggregate data; the use of "cookies" and of Google Analytics<br /><br />
                <Typography variant="h6">General</Typography>
                Our web servers create anonymous logs during user visits to the website, which are used by us to create aggregate statistics, for example about when the website is accessed, the pages which refer visitors to the website, the type of web browsers visitors use and which pages are viewed.<br />
                These statistics help us understand how the website is used and provide us with valuable information for improving it in the future.<br />
                In this, we use both our own "cookies" and a special tool, Google Analytics, as described below.<br /><br />
                <Typography variant="h6">Use of Cookies</Typography>
                A cookie is a text-only piece of information that a website transfers to your computer's hard disk so that the website can remember who you are.<br />
                A cookie will normally contain the name of the Internet domain from which the cookie has come, the "lifetime" of the cookie, and a value, usually a randomly generated unique number.<br /><br />
                We use cookies and collect IP addresses (an IP address is a number that can uniquely identify a specific computer or other network device on the internet).<br />
                We use our own analysis software to look at IP addresses and cookies for the purpose of enhancing your user experience.<br />
                This information is not used to develop a personal profile of you.<br /><br />
                Users have the opportunity to set their devices to accept all cookies, to notify them when a cookie is issued, or not to receive cookies at any time.<br />
                To prevent the download of cookies, or otherwise control how cookies are used on your computer, please read the help information supplied with your Internet browser software or go to: <Link href="http://www.allaboutcookies.org" target="_blank">http://www.allaboutcookies.org</Link>.<br />
                However please note that if you do this you may not be able to use the full functionality of this website.<br /><br />
                <Typography variant="h6">Google Analytics</Typography>
                Our website also uses Google Analytics, a web analytics service provided by Google, Inc. (“Google”).<br />
                Google Analytics uses “cookies” to help the website analyze how users use the site (as described above).<br />
                The information generated by the Google Analytics cookie about your use of the website (including a truncated IP address: see below) will be transmitted to and stored by Google on their servers.<br />
                Google will use this information for the purpose of evaluating your use of the website, compiling reports on website activity for website operators such as us, and providing other services relating to website activity and internet usage. Google may also transfer this information to third parties where required to do so by law, or where such third parties process the information on Google's behalf.<br /><br />
                As explained above, you may refuse the use of cookies—and thus also the use of the Google Analytics cookie—by selecting the appropriate settings on your browser, but this too may affect the extent to which you can fully use the website.<br /><br />
                <Typography variant="h6">Your Agreement</Typography>
                In accordance to what we already said at the beginning of this Notice, by using this website, you consent to the processing of data about you, and of aggregate data, by us and by Google in the manner and for the purposes set out above.<br /><br />
                <Typography variant="h6">How do we use information collected?</Typography>
                Your personal information will be retained by us and its service providers in a secure environment, will be kept confidential, and will only be used in connection with the purposes for which it is submitted, or as necessary for us to comply with our legal obligations.<br /><br />
                <Typography variant="h6">Sharing of your personal information?</Typography>
                Other than as described below, the information you provide will not be sold or rented nor will it be shared with any person or entity unrelated to our company, unless we are required to disclose the information by law.<br /><br />
                We may share relevant personal data, obtained through this website for hosting and processing:<br /><br />
                Our website may be hosted by a third party service provider and therefore any personal details you submit through this website may be processed by such a third party service provider.<br />
                We may also use other third parties to process some of your personal details, for example to send you books or other goods you have ordered (so-called "fulfillment").<br />
                All of these third party services providers will process your personal information only on our behalf and will be bound by strict confidentiality conditions.<br /><br />
                <Typography variant="h6">Payment processing and fraud</Typography>
                Your card or other details may be disclosed to banks or relevant financial institutions to arrange payments.<br />
                In the case of a suspected fraudulent transaction, your details may be further disclosed for the sole purpose of performing further checks (for example, disclosure to a credit checking agency).<br />
                Trans-border data flows<br />
                If you have accessed this webpage from within the European Union or the European Economic Area, you should be aware that the disclosure of your personal information discussed above will involve transfer of that information to us.<br /><br />
                <Typography variant="h6">Your Rights</Typography>
                Right of access to your personal information:<br />
                You have a right of access to any personal information that we collect about you on this website and that is retrievable from this website by reference to you personally.<br />
                Right of correction:<br />
                You have a right to correct the information we hold on you, or to have it deleted, if it is incorrect, irrelevant or out of date.<br />
                Right to object:<br />
                When we ask for your contact information in various forms, we will explain to you what we want to use those details for, and we will offer you options in regard of their use.<br />
                Specifically, we will explain if we want to use certain information, such as your phone number or mobile phone number or email address, to contact you.<br />
                You can also, at any time, let us know by simple email if you do not want to be contacted any more, either in general or by certain special means (e.g., by text or phone call).<br />
                We will then, within a short period, ensure that such follow-up contacts are stopped.<br /><br />
                <Typography variant="subtitle2">
                    IF YOU HAVE ANY QUESTIONS ABOUT THIS PRIVACY NOTICE OR OUR PRIVACY POLICES; OR IF YOU WANT TO EXERCISE ANY OF THE ABOVE-MENTIONED RIGHTS.
                </Typography>*/}
            </>
        },
        tou: {
            name: "tou",
            title: "Terms of Use",
            description: () => <>

                <strong>Terms and Conditions</strong><br /><br />
                <strong>1.	Terms of Service</strong><br />
			    Past the Post Technologies (PTP, We, Our, Us and other similar terms)
                provides access to the Service to the User <b>(You, Your and other similar terms)</b>
                on the terms and conditions contained in this Terms of Service
                <strong> By clicking “I Accept”You warrant:</strong>

                <li>(a)	You have had the opportunity to read and fully understand the term and conditions contained in this Agreement; </li>
                <li>(b)	You will use the Service on the terms and conditions contained herein; and</li>
                <li>(c)	You have the authority to enter into this Agreement.</li>
  
                <strong>2.	Definitions and interpretation</strong><br /><br />
                <strong>2.1	Defined terms</strong><br />
                    

                        <strong> In this Terms of Service: </strong>
                        <b>Account</b> means a username and password provided to the User by the PTP to access the Service. Affiliate means an organisation that has agreed to pay Us compensation for introducing You to them including but not limited to NEDS, Bookmarker and Betstar.
							<b>Agreement</b> means the terms and conditions contained in this Terms of Service including any annexures or document We incorporate by reference.
							<strong>Business Day </strong>means:
			
                            <li>(a) for receiving a Notice, means a day that is not a Saturday, Sunday, public holiday or bank holiday in the place where the Notice is received; and </li>
                            <li>(b) for all other purposes, a day that is not a Saturday, Sunday, bank holiday or public holiday in  Queensland Australia.</li>
                  
                        <b>Commencement Date</b> means the date that You click the “I accept” button on the Website to signal Your acceptance of this Agreement.
							<b>Content</b> means data, music, speech or other sounds, text, visual images (animated or otherwise) in any form, or in any combination of forms as defined in Schedule 7 of Broadcasting Services Act 1992 (Cth), including but not limited to, data files, graphics images, messages, photographs, sounds, videos, written text and any other like materials.
							<b>Documentation</b> means the user manual and or guide and explanatory notes or memoranda provided in either electronic or physical form to the User that is supplied with the Service provided by PTP as updated from time to time.
							<b>Facilities</b> means any feature that appears on the Website that enables the User to access, upload or use the Content.
							<b>Fee</b> means the amount of money payable for the right to access the Service as selected from the Website as advised from time to time.
							<b>Intellectual Property</b> means all industrial and intellectual property rights including, without limitation, patents, copyrights, right to extract information from databases, design rights, trade secrets, rights of confidence, and all forms of protection of a similar nature or having similar effect to any of them which may subsist anywhere in the world (whether or not any of them are registered and including applications and the right to make applications for registration of any of them).
							<b>Non-Excludable Provision</b> means any guarantee, condition or warranty (such as the consumer guarantees implied by the Competition and Consumer Act 2010 (Cth)), which cannot by law be excluded.
							<b>Party</b> means PTP, and the User who has agreed to be bound to the terms and conditions in this Agreement.
							<b>Service</b> means the provision of online racing related information and data.
							<b>Term</b> means the period of time which we are prepared to provide You with access to the Service as shown on Our Website.
							<b>User</b> means a person authorised to access and use the Service pursuant to the terms of this Terms of Service, whether using the Service on behalf of an organisation with their authorisation or in Your own personal capacity.
							<b>Website</b> means the website located at the URL https://www.ptptips.com.au/.
		
                    <strong>2.2 Interpretation</strong><br /><br />
     
                        <strong> In this Agreement: </strong><br/>
                   
                            (a) a reference to:
								
                                    <li>(i)	one (1) gender includes the others;</li>
                                    <li>(ii)	the singular includes the plural and the plural includes the singular;</li>
                                    <li>((iii)	a person includes a body corporate;</li>
                                    <li>(iv)	a document or instrument includes the document or instrumented as novated, altered, supplemented or replaced from time to time; </li>
                                    <li>(v)	a Party includes the Party’s executors, administrators, successors and permitted assigns;</li>
                                    <li>(vi)	a statute, regulation or provision of a statute or regulation (Statutory Provision) includes:</li><br/>
										
                                            <li>I.	that Statutory Provision as amended or re-enacted from time to time; and</li>
                                            <li>II.	a statute, regulation or provision enacted in replacement of that Statutory Provision;</li>
                                      
                                    <br/>
                                    <li>(vii)	an amount of money is to an amount in Australian dollars ($AUD);</li>
                                    <li>(viii)	time is to Queensland; and</li>
                                    <li>(ix)	a Schedule refers to a Schedule contained in this Agreement; </li>
                                
                         
                            (b) including and similar expressions are not words of limitation;
                            (c)	where a word or expression is given a particular meaning, other parts of speech and grammatical forms of that word or expression have a corresponding meaning;
                            (d)	headings and the table of contents are for convenience only and do not form part of this Agreement or affect its interpretation;
                            (e)	where a day on or by which an obligation must be performed or an event must occur is not a Business Day, the obligation must be performed, or the event must occur on or by the next Business Day; and
							a provision of this Agreement must not be construed to the disadvantage of a Party merely because that Party was responsible for the preparation of this Agreement or the inclusion of the provision in it.
				
                
                    <strong>3.	Responsible gambling</strong><br/><br/>
          
                        PTP supports responsible gambling.
						
                            <li>(a)	(a)	Don’t go over the top.   </li>
                            <li>(b)	Gamble responsibly. </li>
                            <li>(c)	<b>Think!</b> About your choices. </li>
                            <li>(d)	Call Gambling Help on 1800 858 858 or visit
                                www.gamblinghelp.nsw.gov.au or www.gamblinghelponline.org.au
                                if you need assistance</li>
                       
                 
                    
            
                
                    <strong>4.	Right of access</strong><br/><br/>
                    <strong>4.1	Commencement and Term</strong><br/>
                    
                        This Agreement commences on the Commencement Date and continues for the Term unless terminated earlier according to the provisions contained herein.
						
                    <strong>4.2	Grant of rights</strong><br/>
                    
                        The PTPgrants the User a non-exclusive, non-transferrable right to access and use the Services in exchange for the Fee during the Term.
						
                    <strong>4.3	Ownership of the Service</strong><br/>
                    
                        The Userdoes not acquire any express or implied Intellectual Property rights, in the Service beyond the right to use it for the Term as provided herein.
						
                    <strong>4.4	Ownership of Content</strong><br/>
                    
                        <strong>User acknowledges and agrees that:</strong><br/>
                  
                            <li>(a)	You own the Content You upload to the Website and licenseit to PTP in perpetuity;</li>
                            <li>(b)	any uploaded Content may be used by PTP to promote Our Service; and</li>
                            <li>(c)	any uploaded Content will be displayed in association with Your use of the Service</li>
                   
                    
                
                
                    <strong>5.	Requirements for the use of the Service</strong><br/>

                            <li>(a)	Users agree to access the Service in accordance with the instructions provided by Us from time to time</li>
                            <li>(b)	For the Service to operate most effectively, User must use the recommended browser types as described on our Website.</li>
                    
                    <strong>5.2	Support</strong><br/>
                    
                        Should you encounter a problem with the Service please contact us via the details set out in clause 13 (Notices), below.
						
                    <strong>5.3	Trial use</strong><br/>
 
                            <li>(a)	PTP may offer User’s with Trial access to the Service.</li>
                            <li>(b)	Notwithstanding that the User does not pay for the Trial, the terms and conditions contained herein apply to Your use of the Service during the Trial Period. </li>
                            <li>(c)	We have the right to determine the User’s eligibility for a Trial and to withdraw or modify a Trial at any time without prior notice and without obligation.</li>
                            <li>(d)	At the end of the Trial Period, You will be required to pay a Fee in order to continue using the Service.</li>
                    
                
                
                    <strong>6.	Account and password</strong><br/><br/>
                    <strong>6.1	Account creations</strong><br/>
                    
                        Account holders must be:
                            <li>(a)	at least 18 years of age;</li>
                            <li>(b)	have capacity to enter into a legally binding agreement with Us; and</li>
                            <li>(c)	agree to use the Service in accordance with these Terms of Service.</li>
    
                    
                    <strong>6.2	Security of passwords</strong><br/>

                            <li>(a)	Users must keep all usernames and passwords to the Service strictly confidential.</li>
                            <li>(b)	The User is responsible for:
                                    <li>(i)	all activity that occurs via the Service, whether authorised or not; and</li>
                                    <li>(ii)	ensuring the security of the username and password which it is provided to access the Service</li>
                            </li>
 
                    
                    <strong>6.3	Use of accounts</strong><br/>
                    
                        Each Useris responsible for ensuring that it is the sole person entitled to use the Service and that they are capable of complying with the terms contained in this Agreement.
						
                
                
                    <strong>7.	Privacy obligations</strong><br/>
                    <strong>7.1	Privacy Policy</strong><br/>
                    
                        The Useracknowledges that Past the Post Technologies’ Privacy Policy applies to its use of the Service.   Our Privacy Policy is available on the Website
						
                    <strong>7.2	Consent to the provision of information to third parties</strong><br/>
                    
                            <li>(a)	The User acknowledges that its details and the details of its End Users may be provided to third parties in order for the Service to operate effectively.  </li>
                            <li>(b)	The User acknowledges that information about them may be sent between countries to other entities that PTP has commercial contracts with.  The provision of such information will be under an implied obligation of confidence</li>
                            <li>(c)	We may pass Your contact details onto Affiliates and receive compensation from them in exchange for doing this.  We are not responsible for any losses (or gains) you make when using the Affiliate</li>
    
                
                    <strong>8.	Prohibitions on use</strong><br/>
                    <strong>8.1	Prohibited acts</strong><br/>
                    

                            <li>(a)	You agree that You must not:
					
                                    <li>(i)	infringe Past the Post Technologies or any third Party’s Intellectual Property in the Service;</li>
                                    <li>(ii)	use the Service in any way that could damage Our reputation,Our goodwill or other rights enjoyed by Past the Post Technologies;</li>
                                    <li>(iii)	permit any third Party to obtain access to the Service using the username and password provided;</li>
                                    <li>(iv)	reproduce, make error corrections to or otherwise modify or adapt the Intellectual Property in the Service, Documentation or create any derivative works based on the Service and Documentation;</li>
                                    <li>(v)	de-compile, disassemble, decrypt, or otherwise reverse engineer the Service or permit any third party to do so; </li>
                                    <li>(vi)	transfer, sublicense, rent, lease, lend, license or otherwise transfer or assign the Service; and </li>
                                    <li>(vii)	modify or remove any copyright or proprietary notices associated with the Service.</li>
                    
                            </li>
               
                    
                
                
                    <strong>9.	Warranties and disclaimers</strong><br/><br/>
                    <strong>9.1	Warranties</strong><br/>
                    
                            (a)	You agree that You must not:
                                    <li>(i) To the fullest extent permissible by law, the Service, and the Documentation are provided to the User without any representations or warranties.  You agree to use the Service at your own risk.</li>
                                    <li>(ii) Nothing in this Agreement excludes, restricts or modifies any right or remedy, or any guarantee, warranty or other term or condition implied or imposed by legislation which cannot be lawfully excluded or limited.  Such legislation includes the Australian Consumer Law (ACL) which contains guarantees that protect the purchasers of goods or services in certain circumstances.</li>
                                    <li>(iii) Subject to Past the Post Technologies obligations under the non-excludable provisions, and to the fullest extent permissible by law, PTP expressly disclaims all warranties of any kind with respect to the Service and the Documentation, whether express, implied, statutory, or arising out of the course of performance, course of dealing or usage of trade including any warranties or merchantability, fitness for a particular purpose, satisfactory quality, accuracy and title of non-infringement.</li>
                            
       
                    
                    <strong>9.2	Accuracy of and availability of information</strong><br />
                    
                   
                            <li>(i) While PTP uses its best endeavours to supply the Services in a timely and reliable manner, We do not warrant or make any representation regarding accessibility, correctness, accuracy, timeliness, completeness, reliability or otherwise in respect of the Service.</li>
                      
                               (ii) The information provided is for Your own analytical processes, We do not:
										
                                        <li>(i) offer wager advice;</li>
                                        <li>(ii) make any representations as to the outcome of any race; or</li>
                                        <li>(iii) take into account Your personal circumstances.</li>
                             
                          
                         
                                    <li>(iii) In using this Service You accept all risks associated with any gambling decisions you make.</li>
                                    <li>(iv) We may display live odds from from Affiliates and bookmakers as the case may be.  This information is provided to You in good faith and You agree to verify this information before relying on it.</li>
                          
                        
                     
                    

                    <strong>10	Liability</strong><br/>
               
                            <b>(i)	Exclusion of liability</b>
                         
                                    <li>(i) PTP is not liable to the User for any claim, loss, expense or damages, whether arising in contract, in tort (including negligence), in equity, by operation of law or otherwise arising out of or in connection with this Agreement or the services provided to the subscriber except as expressly provided for herein.</li>
                              
                                   (ii)	Exclusion of liability
												
                                                <li>(i) supplying the Services for an equivalent term; and</li>
                                                <li>(ii) paying the cost of having the Services supplied again.</li>
                                      
                             
                            
                          
                    

             
                          <b>(ii) Exclusion of consequential losses</b>
                            
                                    <li>(i) Subject to any claims made because of a breach of a Non-Excludable Provision available under the ACL, PTP, its employees, officers and agents are not liable for any loss or damage, including, but not limited to, direct, indirect or consequential losses including any third party loss, loss of profits, loss of revenue, loss of opportunity, loss of anticipated savings, pure economic loss and an increased operating cost, personal injury or death, however suffered or sustained in connection with:</li>
                            
                              
                                        
                                                <li>(i) any inaccurate or incorrect information provided by the Service;</li>
                                                <li>(ii) the User’s use of the Service;</li>
                                                <li>(iii) any failure or delay including, but not limited to, the use or inability to use the Service; or</li>
                                                <li>(iv) any interference with or damage to the User’s computers which occurs in connection with the use of the Service.</li>
                                
                                   
                            
                                    <li>(ii) Nothing in this Agreement attempts to limit or exclude liability of PTP in compliance with section 64 of the ACL.</li>
                         
                 
              
                 

                    <strong>11. Indemnity</strong><br/>
                    
                 
                            <li>(i) You indemnify Us for any loss or damage We suffer as a result of Your breach of this Agreement (including the warranties you give us under these Terms), or any wilful misconduct, unlawful acts or negligence in Your use or misuse of the Service.</li>
                            <li>(ii)	The User indemnifies, defends and holds harmless PTP in respect of all actions, claims, proceedings, demands, liabilities, losses, damages, expenses and costs (including legal fees on a full indemnity basis), in connection with any of the following:
                                    </li>
                                            <li>(i) any breach of a provision of this Terms of Service; and</li>
                                            <li>(ii) PTP’s negligent acts or omissions; and.</li>
                                            <li>(iii) any losses that the User suffers because of their use of a service provided by an Affiliate which we have referred You; and.</li>
                                            <li>(iv) use of the Service, including any third-party claims made in connection with, or arising out of, the User’s use of the Service.</li>
                                 
                               
                           
                         
                     
                    

             <strong>12. Termination</strong><br/>
                    
                    
                            <li><b>(i) Termination by Past the Post Technologies</b></li>
                            <li>(ii) We may terminate this Terms of Service without notice if:</li>
                      
                                        <li>(i) We no longer have the right to provide the Service to the User for any reason whatsoever; </li>
                                        <li>(ii) You breach a material term of this Agreement, which is not capable of being remedied, after first notifying you of the breach;</li>
                               
                              
                                <li>(iii) after having made reasonable inquiries, that the User:</li>
                       
                                        <li>(i) is reverse engineering or otherwise creating derivative works based on the Intellectual Property contained in the Service;</li>
                                        <li>(ii) is attempting to circumvent any technological protection measure which limits the User’s ability to utilise multiple copies of the Service;</li>
                                        <li>(iii) the User Trial has expired, and the End User has not paid the Fee.</li>
                              
                           
                      
                         <b>(iv) Termination for non-payment</b>
                         
                                    <li>The payment of the Fee is an essential term of this Agreement.  PTP may terminate this Agreement by providing the User with seven (7) days’ notice if it fails to pay the Fee. </li>
                           
                        
                            <li><b>(v) Actions upon termination</b></li>
                           On termination of this Agreement for whatever reason, the User:
										
                                    <li>must stop using the Service within seven (7) days;</li>
                                    <li>must return or destroy all copies of any Documentation; and</li>
                                    <li>agrees that the balance of any prepaid Fee is forfeited.</li>
                            

                    <strong>13. Notices</strong><br/>
                    (i) For all correspondence including Notices in relation to this Agreement please contact Us as follows:
								
                           
                            
                                            <li>Past the Post Technologies ACN  637 874 992</li>
                                            <li>Unit 24, 15 Cavill Avenue</li>
                                            <li>Surfers Paradise QLD 4217</li>
                                            <li>Nominated email:  support@ptptips.com.au If required, We will contact You via the contact details on your Account.  If We have multiple contact details for You, We will use the most recent contact details to provide notices to You.</li>
                       
                    <strong>14. Miscellaneous provisions</strong><br/>
                    
                
                            <li><b> (i) Access to the Service outside the Jurisdiction</b> -
										No representation or warranty is made that the Content on the Website complies with the laws of any country outside of Australia.   If User’s access the Service from outside Australia, they do so at their own risk.
										</li>
                            <li><b> (ii) Approvals and consents</b> -
										Except where this Agreement expressly states otherwise, a Party may, in its discretion, give conditionally or unconditionally or withhold any approval or consent under this Agreement.
										</li>
                            <li><b> (iii) Assignment </b> -
										PTP may assign any of its rights and obligations under this Agreement by notifying the User of such an assignment.  The User may not assign its rights under this Agreement without the prior written consent of PTP, which may be granted or withheld at its complete discretion and, if granted, may be subject to conditions.
										</li>
                            <li><b> (iv) Entire agreement  </b> -
										This document contains the entire agreement between the Parties in connection with its subject matter and supersedes all previous agreements and understandings except as otherwise provided herein.
										</li>
                            <li><b> (v) Further assurances  </b> -
										 Each Party must do anything (including execute any document) and must ensure that its personnel do anything (including execute any document), the other Party may reasonably require to give full effect to this Agreement.
										</li>
                            <li><b> (vi) Governing law and jurisdiction  </b> -
										This Agreement is governed by the laws of Queensland, Australia and each Party irrevocably submits to the non-exclusive jurisdiction of the Courts of Queensland, Australia.
										</li>
                            <li><b> (vii) Severance   </b> -
										If anything in this Agreement is unenforceable, illegal or void then it is severed and the rest of this Agreement remains in full force and effect.
										</li>
                            <li><b> (viii) Survival    </b> -
										Any clause which is expressed to survive, or which by its nature is intended to survive termination of this Agreement, survives termination.
										</li>
                            <li><b> (ix) Waiver    </b> -
										A Party’s failure or delay to exercise a power or right does not operate as a waiver of that power or right.  A waiver is not effective unless it is in writing and signed by the Party giving it.
										</li>
                            <li><b> (x) Warranties regarding capacity     </b> -
										Each Party represents to each other that, as at the date of this Agreement:
                                        </li>
                                    <li>(i) it has taken all necessary action to authorise its entry into and performance of this Agreement;</li>
                                    <li>(ii) it has the power to enter into and perform its obligations under this Agreement;</li>
                                    <li>(iii) it is not aware of any thing, matter or circumstance which may prevent it from fulfilling its obligations under this Agreement; and</li>
                                    <li>(iv) its obligations under this Agreement are valid and binding and enforceable against it in accordance with its terms.</li>
      
            
                {/*This website featured to you is subject to the following Terms and our Privacy Notice. If you visit our websites you accept these conditions.<br />
                Please read them carefully.<br /><br />
                <Typography variant="h6">1. Scope and Addressees</Typography>
                This website is operated and administered by _______ (see "Legal Notice"), and therefore complies with the applicable laws.<br /><br />
                <Typography variant="h6">2. Data Privacy Protection</Typography>
                Personally identifiable data of the user of this website will be collected, used and processed in compliance with applicable laws on data privacy protection and our "Privacy Notice".<br /><br />
                <Typography variant="h6">3. Intellectual Property Rights</Typography>
                All materials available on this site are protected by copyright laws and international copyright treaty provisions.<br /><br />
                <Typography variant="h6">4. Hyperlinks</Typography>
                The Site may contain hyperlinks to the web pages of third parties.<br />
                We shall have no liability for the contents of such web pages and does not make representations about or endorse such web pages or their contents as its own, as we do not control the information on such web pages and is not responsible for the contents and information given thereon. The use of such web pages shall be at the sole risk of the user.<br /><br />
                <Typography variant="h6">5. Applicable Law, Place of Jurisdiction</Typography>
                These Terms of Use including its disclaimers, terms and conditions shall be governed by—and all disputes relating to or in connection with these Terms of Use or their subject matter shall be resolved in accordance with—the European laws, without giving effect to any principles of conflicts of laws.<br />
                We reserve the right to make changes to this site and these disclaimers, terms and conditions at any time.<br />
                User hereby irrevocably and unconditionally consents to submit to the exclusive jurisdiction of the European court for any litigation arising out of or relating to use of this site (and agrees not to commence any litigation relating thereto except in such courts) waives any objection to the laying of venue of any such litigation.<br /><br />
                <Typography variant="h6">6. Severability</Typography>
                The provisions of these Terms of Use are intended to be severable. If for any reason any provision of these Terms of Use shall be held invalid or unenforceable in whole or in part in any jurisdiction, such provision shall, as to such jurisdiction, be ineffective to the extent of such invalidity or unenforceability without in any manner affecting the validity or enforceability thereof in any other jurisdiction or the remaining provisions hereof in any jurisdiction.<br />*/}
            </>
        },
        trademarks: {
            name: "trademarks",
            title: "Trademarks",
            description: () => <>
                All materials available on this site are protected by copyright laws and international copyright treaty provisions.<br />
                This material has been placed on this Internet site under the authority of the copyright owner for the sole purpose of viewing of the materials by users of this site.<br />
            </>
        },
    }

    return <Typography variant="caption">
        {Object.keys(contentObject).map((x, i) => <span key={i}>{i > 0 && separator}&nbsp;<Link href="#" name={contentObject[x].name} onClick={clickHandler}>{contentObject[x].title}</Link></span>)}
        <Dialog
            open={open}
            onClose={() => toggleOpen(false)}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
        >
            <DialogTitle id="dialog-title" color="primary">
                {contentObject[dialog].title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="dialog-description">
                    {contentObject[dialog].description()}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => toggleOpen(false)} color="primary" autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </Typography>
}

export default NoticeDialog;