import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark, faEye } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import { Modal } from "antd";
import Link from "next/link";

import { BACKEND_URL } from "../utils/urls";
import { UserState, login, logout } from "../reducers/user";
import { removeAllBookmark } from "../reducers/bookmarks";
import { showAllArticles } from "../reducers/hiddenArticles";
import styles from "../styles/Header.module.css";

interface ResponseData {
  result: boolean;
  token: string;
}

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state: { user: UserState }) => state.user.value);

  const [date, setDate] = useState<string | Date>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [signUpUsername, setSignUpUsername] = useState<string>("");
  const [signUpPassword, setSignUpPassword] = useState<string>("");
  const [signInUsername, setSignInUsername] = useState<string>("");
  const [signInPassword, setSignInPassword] = useState<string>("");

  useEffect(() => {
    setDate(new Date());
  }, []);

  const handleRegister = () => {
    fetch(BACKEND_URL + "/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json() as Promise<ResponseData>)
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: signUpUsername, token: data.token }));
          setSignUpUsername("");
          setSignUpPassword("");
          setIsModalVisible(false);
        }
      });
  };

  const handleConnection = () => {
    fetch(BACKEND_URL + "/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json() as Promise<ResponseData>)
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: signInUsername, token: data.token }));
          setSignInUsername("");
          setSignInPassword("");
          setIsModalVisible(false);
        }
      });
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeAllBookmark());
  };

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  let modalContent: React.JSX.Element = <></>;
  if (!user.token) {
    modalContent = (
      <div className={styles.registerContainer}>
        <div className={styles.registerSection}>
          <p>Sign-up</p>
          <input
            type="text"
            placeholder="Username"
            id="signUpUsername"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSignUpUsername(event.target.value)
            }
            value={signUpUsername}
          />
          <input
            type="password"
            placeholder="Password"
            id="signUpPassword"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSignUpPassword(event.target.value)
            }
            value={signUpPassword}
          />
          <button id="register" onClick={() => handleRegister()}>
            Register
          </button>
        </div>
        <div className={styles.registerSection}>
          <p>Sign-in</p>
          <input
            type="text"
            placeholder="Username"
            id="signInUsername"
            onChange={(e) => setSignInUsername(e.target.value)}
            value={signInUsername}
          />
          <input
            type="password"
            placeholder="Password"
            id="signInPassword"
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
          />
          <button id="connection" onClick={() => handleConnection()}>
            Connect
          </button>
        </div>
      </div>
    );
  }

  let userSection: React.JSX.Element;
  if (user.token) {
    userSection = (
      <div className={styles.logoutSection}>
        <FontAwesomeIcon
          icon={faEye}
          className={styles.userSection}
          onClick={() => dispatch(showAllArticles())}
        />
        <p>Welcome {user.username} / </p>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
    );
  } else {
    if (isModalVisible) {
      userSection = (
        <div className={styles.headerIcons}>
          <FontAwesomeIcon
            onClick={showModal}
            className={styles.userSection}
            icon={faXmark}
          />
        </div>
      );
    } else {
      userSection = (
        <div className={styles.headerIcons}>
          <FontAwesomeIcon
            icon={faEye}
            className={styles.userSection}
            onClick={() => dispatch(showAllArticles())}
          />
          <FontAwesomeIcon
            onClick={showModal}
            className={styles.userSection}
            icon={faUser}
          />
        </div>
      );
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Moment className={styles.date} date={date} format="MMM Do YYYY" />
        <h1 className={styles.title}>Morning News</h1>
        {userSection}
      </div>

      <div className={styles.linkContainer}>
        <Link href="/">
          <span className={styles.link}>Articles</span>
        </Link>
        <Link href="/bookmarks">
          <span className={styles.link}>Bookmarks</span>
        </Link>
      </div>

      {isModalVisible && (
        <div id="react-modals">
          <Modal
            getContainer="#react-modals"
            className={styles.modal}
            open={isModalVisible}
            closable={false}
            footer={null}
          >
            {modalContent}
          </Modal>
        </div>
      )}
    </header>
  );
}
