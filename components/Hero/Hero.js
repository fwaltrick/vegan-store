import Logo from "../../public/images/logo.svg"
import Woman from "../../public/images/woman_path.svg"
import Lettering from "../../public/images/pretty.svg"
import LetteringMobile from "../../public/images/lettering-mobile.svg"

function Hero() {
  return (
    <div className='hero'>
      <Woman className='hero-woman' />
      <Lettering className='hero-lettering' />
      <LetteringMobile className='hero-lettering--mobile' />
      <Logo className='hero-logo' />
    </div>
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     background: "#faad14",
    //     width: "100%",
    //     padding: "3rem",
    //   }}
    // >
    //   <Logo />
    // </div>
  )
}

export default Hero
