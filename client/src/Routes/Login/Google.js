import React from 'react';
import  GoogleLogin from 'react-google-login';


function Google() {

    const responseGoogle = response => {
        console.log(response);
        
    }


   return(
       <div>
            <GoogleLogin
                  clientId="456699879153-8fq6596vepc2sm6207tn2frootqmgrku.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />,
       </div>
   ); 
}

export default Google;