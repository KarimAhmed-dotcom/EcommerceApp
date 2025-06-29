import styles from './Footer.module.css'
import amazon from '../../../assets/images/Amazon_Pay_logo.png'
import masterCard from '../../../assets/images/MasterCard-Logo.png'
import PayPal from '../../../assets/images/PayPal.png'
import  googlePlay from '../../../assets/images/get-it-on-google-play-badge.png'
import appStore from '../../../assets/images/get-it-on-apple-store.png'


function Footer() {
  return (
    <footer className={styles.footer}>
      <section className="container">
        <h2>Get The Fresh-Cart App</h2>
        <p>
          We will send you a link. Open it on your phone to download the app.
        </p>
        <form className="d-flex gap-4">
          <input type="email" placeholder="Email" aria-label="email" className="form-control" />
          <button className="bg-color rounded-2 py-2 px-4 text-white border-0" style={{whiteSpace:'nowrap'}}>Share App Link</button>
        </form>
        <hr />
        <div className='links'>
            <div className='row '>
                <div className='col col-12 col-sm-12 col-md-12 col-lg-6'>
                    <div className='partners gap-4 d-flex align-items-center'>
                        <h5>Payment Partners</h5>
                        <ul className='list-unstyled d-flex gap-3 align-items-center mb-0 flex-wrap'>
                            <li>
                                <img src={amazon} alt='Amazon Pay' width='70px'/>
                            </li>
                            <li>
                                <img src={PayPal} alt='PayPal' width='70px'/>
                            </li>
                            <li>
                                <img src={masterCard} alt='Master Card' width='70px'/>
                            </li>
                        </ul>
                    </div>
                </div>
            
            <div className='col col-12 col-sm-12 col-md-12 col-lg-6'>
                    <div className='download d-flex align-items-center gap-4'>
                        <h5>Get Delivers With FreshCart</h5>
                        <ul className='list-unstyled d-flex align-items-center mb-0 gap-2 flex-wrap'>
                        <li>
                            <img
                            src={googlePlay}
                            alt='download google play'
                            className='img-fluid'
                            style={{ maxWidth: '130px', width: '100%', height: 'auto' }}
                            />
                        </li>
                        <li>
                            <img
                            src={appStore}
                            alt='download app store'
                            className='img-fluid'
                            style={{ maxWidth: '130px', width: '100%', height: 'auto' }}
                            />
                        </li>
                        </ul>
                    </div>
            </div>
            
            </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
