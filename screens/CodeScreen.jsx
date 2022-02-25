import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Popup from '../components/Popup';

import styles from '../styles/CodeScreen.module.css';
import { useEffect, useState } from 'react';

import axios from 'axios';

import { useSelector } from 'react-redux';

import React from 'react';
import Router from 'next/router';

import {
  Snackbar,
  snack,
  infosnack,
  warnsnack,
  successsnak,
  errorsnak,
} from '../components/ui/Tost';

import dynamic from 'next/dynamic';
import '@uiw/react-textarea-code-editor/dist.css';

const CodeEditor = dynamic(
  () => import('@uiw/react-textarea-code-editor').then((mod) => mod.default),
  { ssr: false }
);

const CodeScreen = ({ codeid }) => {
  const username = useSelector((state) => state.userReducer); //username
  const token = useSelector((state) => state.tokenReducer); // token

  const [id, setid] = useState(codeid || '');
  const [isEdit, setisEdit] = useState(true);
  const [isNew, setisNew] = useState(true);
  const [idDelete, setIsDelete] = useState(true); //Delete Button

  const [code, setCode] = useState({}); // fatch code from server
  const [idecode, setIdeCode] = useState(''); // set ide code
  const [output, setOutput] = useState('compiling'); // code output

  const [isOpen, setIsOpen] = useState(false); // Output Screen

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const runCode = async () => {
    setOutput('compiling...');
    togglePopup();
    if (isOpen == false)
      try {
        const res = await axios.post('/api/code/run', {
          ...code,
          len: code.len || 'c',
        });
        if (res.status == 200) {
          res.data.exitCode
            ? setOutput(res.data.stderr)
            : setOutput(res.data.stdout);
        } else {
        }
      } catch (error) {}
  };

  const isAdminCode = () => {
    if (username == code.username) return true;
    else return false;
  };

  const isNewCode = () => {
    if (id == '' || id == null) return true;
    else return false;
  };

  // fatch user code by ID
  const fatchcode = async () => {
    setisNew(isNewCode());
    setIsDelete(isAdminCode());
    if (isNewCode()) null;
    else
      try {
        const res = await axios.get('/api/code/' + id);
        if (res.status == 200) {
          setCode(res.data); // set code detiles
          setisEdit(isAdminCode()); // isAdmin ?
        }
      } catch (error) {}
  };

  // Create new code
  const createcode = async () => {
    const data = { ...code, username: username };
    try {
      const res = await axios.post('/api/code', data);
      if (res.status == 200) {
        Router.back();
      }
    } catch (error) {}
  };
  //Delete code by id
  const deletecode = async () => {
    const headers = { token };
    const data = { username };

    try {
      const res = await axios.delete('/api/code/' + id, { headers, data });
      if (res.status == 200) {
        Router.back();
      }
    } catch (error) {
      Router.push('/code');
    }
  };
  //Update code by id
  const updatecode = async () => {
    const headers = { token };
    const data = {
      code: code.code,
      title: code.title,
      dec: code.dec,
      len: code.len,
      username: username,
    };

    try {
      const res = await axios.patch('/api/code/' + id, data, { headers });
      if (res.status == 200) {
        successsnak(res.data.status, {});
      } else {
        errorsnak(res.data.error, {});
      }
    } catch (error) {
      errorsnak(error.message, {});
    }
  };

  useEffect(() => {
    fatchcode();
    setid(codeid);
  }, [codeid, id, isEdit, username]);
  return (
    <>
      <Hero />

      <Snackbar />
      <div className={styles.main}>
        <div className={styles.container}>
          {isEdit ? (
            <input
              onChange={(e) =>
                setCode((code) => ({ ...code, dec: e.target.value }))
              }
              value={code.dec}
              placeholder="Code description..."
              className={styles.inputDec}
            />
          ) : (
            <div>{code.dec}</div>
          )}
          <div className={styles.inputBox}>
            {isEdit ? (
              <input
                onChange={(e) =>
                  setCode((code) => ({ ...code, title: e.target.value }))
                }
                value={code.title}
                placeholder="Filename"
                className={styles.inputTitle}
              />
            ) : (
              <div>{code.title}</div>
            )}
            <div className={styles.flex}>
              <select
                value={code.len}
                onChange={(e) =>
                  setCode((code) => ({ ...code, len: e.target.value }))
                }
                name="codelen"
                className={styles.codelen}
              >
                <option value="c">C</option>
                <option value="cpp">CPP</option>
                <option value="java">JAVA</option>
                <option value="js">JS</option>
                <option value="py">Python</option>
              </select>
              <div onClick={runCode} className={styles.postBtn}>
                {isOpen ? 'Edit Code' : 'Run Code'}
              </div>
            </div>
          </div>

          <div>
            {isOpen ? (
              <Popup content={<>{output}</>} handleClose={togglePopup} />
            ) : (
              <CodeEditor
                value={code.code}
                language="js"
                placeholder="Please enter code."
                onChange={(evn) =>
                  setCode((code) => ({ ...code, code: evn.target.value }))
                }
                padding={15}
                style={{
                  fontSize: 12,
                  backgroundColor: '#f5f5f5',
                  fontFamily:
                    'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
              />
            )}
          </div>
          {isEdit ? (
            <div className={styles.inputBox}>
              {idDelete ? (
                <div onClick={deletecode} className={styles.postBtn}>
                  Delete
                </div>
              ) : (
                <></>
              )}
              <div
                onClick={isNew ? createcode : updatecode}
                className={styles.postBtn}
              >
                {isNew ? 'Upload' : 'Update'}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CodeScreen;
