import React, { useState } from "react"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import { Layout, Menu, Drawer, Icon } from "antd"
import { MenuOutlined, AlignCenterOutlined } from "@ant-design/icons"
import NProgress from "nprogress"
import Navbar from "./Navbar"
import LotusBlue from "../../public/lotus_blue.svg"

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

function Header() {
  const { Header, Content, Footer } = Layout
  const user = true

  const [toggle, setToggle] = useState(false)

  const showDrawer = () => {
    setToggle(prevToggle => !prevToggle)
    console.log(toggle)
  }

  return (
    <Header className='header menu'>
      <MenuOutlined className='menu-toggle-label' onClick={showDrawer} />
      <Link href='/'>
        <div className='logo'>
          <LotusBlue />
        </div>
      </Link>
      <Navbar mode='horizontal' />

      <Drawer
        placement='top'
        closable={false}
        // destroyOnClose={true}
        className='menu-drawer'
        drawerStyle={{
          background: "#f79992",
          color: "fff",
          paddingBottom: "2em",
        }}
        height={300}
        onClick={showDrawer}
        visible={toggle}
      >
        <Navbar mode='inline' />
      </Drawer>
    </Header>
  )
}

export default Header
