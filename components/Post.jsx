import Router from 'next/router';
import { FiCode, FiThumbsUp } from 'react-icons/fi';

import { useState } from 'react';

import React from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-textarea-code-editor/dist.css';

const CodeEditor = dynamic(
  () => import('@uiw/react-textarea-code-editor').then((mod) => mod.default),
  { ssr: false }
);

import styles from '../styles/Post.module.css';

const Post = ({ post }) => {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.userBox}>
          <span
            onClick={() => Router.push('/' + post.username)}
            className={styles.username}
          >
            {post.username}
          </span>
          <span className={styles.time}>{post.createdAt}</span>

          <span className={styles.title}>{post.dec}</span>
        </div>
        <div className={styles.flex}>
          <div className={styles.list}>
            <FiCode /> <p>{post.len}</p>
          </div>
          <div className={styles.list}>
            <FiThumbsUp />
            <p>{post.stars.length} Likes</p>
          </div>
        </div>
      </div>
      <div onClick={() => Router.push('/code/' + post._id)}>
        <div>
          <CodeEditor
            value={post.code}
            language="js"
            placeholder="Please enter code."
            // onChange={(evn) => setCode(evn.target.value)}
            padding={15}
            className={styles.CodeEditor}
            style={{
              fontSize: 12,
              backgroundColor: '#f5f5f5',
              fontFamily:
                'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
