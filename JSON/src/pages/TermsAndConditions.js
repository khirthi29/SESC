import { Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

export default function TermsAndConditions() {

    return (
        <div style={{marginTop:120,padding:' 0 50px',}}>
            <Link to="/login" component={RouterLink} style={{display: "flex", width: "75px", padding: "9px 7px 0 6px", lineHeight: "24px", background: "#089293", border: "none", color: "#fff",borderRadius: 6,marginBottom: "14px"}}> <img src="/static/mock-images/avatars/angle-left-free-icon-font.png" alt="imgtest"  style={{width:15,marginTop: "3px", marginRight: "6px",marginBottom: "11px"}}/>back</Link>
            <h2>Terms & Conditions</h2>

            <h3 style={{padding:' 15px 0',fontSize: 16, color:'#797D7F'}}>Last updated on JULY 4th 2025</h3>
            
            {/* <div >
            </div> */}
            <div>                
                <p style={{fontSize:14,marginBottom:15}}>Student Portal</p>
            </div>
            
           
            <div>                
                <p style={{fontSize:14,}}>&nbsp;</p>
            </div>

          {/*   <div>
                <h3 style={{padding:' 15px 0',fontSize: 16,}}>Secure Access To Service</h3>
                <p style={{fontSize:14,}}>
                    The access to the site & mobile app is based on One-time Password and user undertakes to maintain the confidentiality of the OTP & account, and shall be held solely responsible for all acts and omissions that occur under his account if OTP is compromised. Xpsolv can not and will not be liable for any loss or damage arising from the user's failure to comply with the terms and conditions of this agreement. The user should always remember to LOG OFF COMPLETELY from Xpsolv, if he is accessing it from a public place.
                </p>
            </div> */}
            
        </div>
    );
}