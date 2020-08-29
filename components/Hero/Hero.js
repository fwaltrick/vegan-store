import Logo from "../../public/images/logo.svg"
// import Woman from "../../public/images/womanPng.png"
import Lettering from "../../public/images/pretty.svg"
import LetteringMobile from "../../public/images/lettering-mobile.svg"

function Woman() {
  return <img src={"/images/womanPng.png"} alt='woman' className='hero-woman' />
}
function Hero() {
  return (
    <div className='hero'>
      <Woman />
      <Lettering className='hero-lettering' />
      <LetteringMobile className='hero-lettering--mobile' />
      <Logo className='hero-logo' />
    </div>
  )
}

export default Hero
