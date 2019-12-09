import React from "react";
import { StyleSheet, css } from "aphrodite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const styles = StyleSheet.create({
  codeLink: {
    fontSize: 16,
    color: '#757575',
    textDecoration: 'underline solid #757575',
  },
});

const WorkText = ({ link }) => {
  const isGithub = link.match(new RegExp("https://github.com/"));
  const iconOption = {
    icon: isGithub ? ['fab', 'github'] : "external-link-alt",
    fontSize: isGithub ? 20 : 15
  }
  const text = isGithub ? "Githubを見る" : "サイトを見る";
  return (
    <a className={css(styles.codeLink)} href={link} target="_blank" rel="noopener">
        <FontAwesomeIcon
            icon={iconOption.icon}
            style={{ fontSize: iconOption.fontSize, marginRight: 5 }}
        />
        {text}
    </a>
  );
}

export default WorkText;
