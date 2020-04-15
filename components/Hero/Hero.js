import Logo from "../../public/logo.svg"

function Hero() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        background: "#faad14",
        width: "100%",
        padding: "3rem",
      }}
    >
      <Logo />
    </div>
  )
}

export default Hero
