import React, { useState } from "react"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import { Layout, Drawer } from "antd"
import { MenuOutlined } from "@ant-design/icons"
import NProgress from "nprogress"
import Navbar from "./Navbar"
import LotusBlue from "../../public/images/lotus_blue.svg"

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

function Header({ user }) {
  const { Header } = Layout
  const isAdmin = user && user.role === "admin"
  const isRoot = user && user.role === "root"
  const isRootOrAdmin = isRoot || isAdmin

  // For determining the height of the Drawer(number of items in menu vary)
  const height = (user) => (user ? 280 : 230)

  const [toggle, setToggle] = useState(false)

  const showDrawer = () => {
    setToggle((prevToggle) => !prevToggle)
  }

  return (
    <Header className='header menu'>
      <MenuOutlined className='menu-toggle-label' onClick={showDrawer} />
      <Link href='/'>
        <div className='logo'>
          <LotusBlue />
        </div>
      </Link>
      <Navbar mode='horizontal' user={user} isRootOrAdmin={isRootOrAdmin} />

      <Drawer
        placement='top'
        closable={false}
        drawerStyle={{
          background: "#f79992",
          color: "fff",
        }}
        height={height(user)}
        onClick={showDrawer}
        visible={toggle}
      >
        <Navbar mode='inline' user={user} isRootOrAdmin={isRootOrAdmin} />
      </Drawer>
    </Header>
  )
}

export default Header
