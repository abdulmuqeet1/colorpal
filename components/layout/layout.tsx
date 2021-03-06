import React, { ReactNode, useState, useEffect, ReactFragment } from "react";
import { useSession } from "next-auth/client";
import { signIn, signOut } from "next-auth/client";

import Head from "./head";
import NextHead from "next/head";
import Header from "./header";
import Footer from "./footer";
import style from "../../styles/Home.module.scss";

import Link from "next/link";
import Image from "next/image";
import {
  AiOutlineShareAlt,
  AiOutlineSearch,
  AiOutlineHeart,
  AiFillSetting,
} from "react-icons/ai";
import { BsMoon, BsSun } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

type Props = {
  children?: ReactNode;
};

export const Dropdown = () => {
  const [session] = useSession();
  const auth = false;
  return (
    <ul className={style.dropdownmenu}>
      {session && (
        <li className={style.userinfo}>
          <Image
            src={`${session.user?.image}`}
            width={30}
            height={30}
            alt="avatar"
            loading="lazy"
          />
          <p>{session.user?.name}</p>
        </li>
      )}

      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/hire">Hire Us</Link>
      </li>

      {session ? (
        //change the link to "/settings"
        <li>
          <Link href="/" passHref>
            <a
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Sign Out
            </a>
          </Link>
        </li>
      ) : (
        <li>
          <Link href="/api/auth/signin" passHref>
            <a
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              Login
            </a>
          </Link>
        </li>
      )}
    </ul>
  );
};

const Layout = ({ children }: Props) => {
  const [session] = useSession();
  const [opennavbtn, setOpennavbtn] = useState(false);
  const [darkmode, setDarkmode] = useState(false);
  const [opendd, setOpendd] = useState(false); //opendd --> open drop down menu

  const handlenavbarbtn = () => {
    setOpennavbtn(!opennavbtn);
  };

  const dropdownhandler = () => {
    setOpendd(!opendd);
  };

  const handledarkmodebtn = () => {
    setDarkmode(!darkmode);

    if (darkmode) {
      window.localStorage.setItem("darkmode", "false");
    } else {
      window.localStorage.setItem("darkmode", "true");
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("darkmode")) {
      let darkmodeval = window.localStorage.getItem("darkmode");
      if (darkmodeval == "true") {
        setDarkmode(true);
      } else {
        setDarkmode(false);
      }
    }
  }, [darkmode]);

  return (
    <>
      <Head />
      <div className={darkmode ? style.darkmainbody : style.lightmainbody}>
        <div className={style.maincontainer}>
          <header className={style.header}>
            <nav className={style.navbar}>
              <Link href="/" passHref>
                <div className={style.logobgimg}>
                  {/* <Image
                    src="/CPlogo1.png"
                    width={70}
                    height={70}
                    alt="logo"
                    loading="lazy"
                  /> */}
                  <h2>COLORPAL</h2>
                </div>
              </Link>
              <ul className={style.mainlinks}>
                <Link href="/" passHref>
                  <li>Home</li>
                </Link>

                <Link href="/library" passHref>
                  <li>Color Library</li>
                </Link>

                <Link href="/palettes" passHref>
                  <li>Color Palette</li>
                </Link>

                <Link href="/gradient" passHref>
                  <li>Gradient Color</li>
                </Link>
              </ul>
            </nav>

            <div className={style.settingslinks}>
              <ul>
                <Link href="/collections" passHref>
                  <li>
                    <AiOutlineHeart />
                  </li>
                </Link>

                <li>
                  <button
                    onClick={() => handledarkmodebtn()}
                    className={style.darkmodebtn}
                  >
                    {darkmode ? <BsSun /> : <BsMoon />}
                  </button>
                </li>

                <a onClick={() => dropdownhandler()}>
                  <li>
                    <AiFillSetting />
                    {opendd && <Dropdown />}
                  </li>
                </a>
              </ul>
            </div>

            <button className={style.navbtn} onClick={() => handlenavbarbtn()}>
              {opennavbtn ? <ImCross /> : <GiHamburgerMenu />}
            </button>

            <div
              className={
                opennavbtn ? style.activemobilelinks : style.mobilelinks
              }
            >
              <nav className="mainlinks">
                <ul>
                  <Link href="/library" passHref>
                    <li>Color Library</li>
                  </Link>
                  <Link href="/palettes" passHref>
                    <li>Color Palette</li>
                  </Link>

                  <Link href="/gradient" passHref>
                    <li>Gradient Color</li>
                  </Link>
                  <Link href="/hire" passHref>
                    <li>Hire Us</li>
                  </Link>
                  <Link href="/about" passHref>
                    <li>ABOUT</li>
                  </Link>
                  {session ? (
                    //change the link to "/settings"
                    <li>
                      <Link href="/" passHref>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            signOut();
                          }}
                        >
                          Sign Out
                        </a>
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link href="/api/auth/signin" passHref>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            signIn();
                          }}
                        >
                          Login
                        </a>
                      </Link>
                    </li>
                  )}
                </ul>
                <div className="mobilenavsocial">
                  <Link href="/collections" passHref>
                    <li>
                      <AiOutlineHeart />
                    </li>
                  </Link>

                  <li>
                    <button
                      onClick={() => handledarkmodebtn()}
                      className={style.darkmodebtn}
                    >
                      {darkmode ? <BsSun /> : <BsMoon />}
                    </button>
                  </li>
                  <Link href="/" passHref>
                    <li>
                      <AiFillSetting />
                    </li>
                  </Link>
                </div>
              </nav>
            </div>
          </header>
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
