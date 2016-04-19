import React from 'react'
import dateformat from '../dateformat'
import dispatcher from '../dispatcher'
import ChannelLink from './channel-link'
import { ColorCodes, ColorCodeRegex, FormatCodes, FormatRegex } from '../color-util'
import { WebsiteRegex, ChannelRegex } from '../util'

class MultiRegex {
  constructor(thing, string) {
    this.thing = thing;
    this.string = string;
  }
  exec() {
    let next = [];
    for (let i = 0; i < this.thing.length; i++) {
      let regex = this.thing[i].regex;
      let func = this.thing[i].func;
      let exec = regex.exec(this.string);
      if (exec) next.push({regex: regex, exec: exec, func: func});
    }
    while (next.length) {
      let index = next.minIndex(e => e.exec.index)
      let n = next[index];
      n.func(next[index].exec);
      let exec = n.regex.exec(this.string);
      if (exec) n.exec = exec;
      else next.splice(index, 1);
    }
  }
}

function parseMessage(message) {
  let elem = <span className="message-content body1"></span>
  let spanStack = [];
  var outerSpans = [];
  let innerSpans = [];
  var lastIndex = 0;
  var currentColour = null;
  let multiRegex = new MultiRegex(
    [
      {
        regex: ColorCodeRegex,
        func: function(match) {
          spanStack.unshift
          innerSpans.push(message.substring(lastIndex, match.index));
          if (currentColour) {
            outerSpans.push(<span className={currentColour}>{innerSpans}</span>);
          } else {
            outerSpans.push(...innerSpans)
          }
          if (typeof match[2] !== 'undefined' && typeof match[1] !== 'undefined') {
            currentColour = [`${ColorCodes[parseInt(match[1])]}-fore`, `${ColorCodes[parseInt(match[2])]}-back`];
          } else if (typeof match[1] !== 'undefined') {
            currentColour = `${ColorCodes[parseInt(match[1])]}-fore`;
          } else {
            currentColour = null;
          }
          lastIndex = match.index + match[0].length;
          innerSpans = [];
        }
      },
      {
        regex: FormatRegex,
        func: function(match) {
          innerSpans.push(message.substring(lastIndex, match.index));
          if (currentColour) {
            outerSpans.push(<span className={currentColour}>{innerSpans}</span>);
          } else {
            outerSpans.push(...innerSpans)
          }
          if (typeof match[2] !== 'undefined' && typeof match[1] !== 'undefined') {
            currentColour = [`${ColorCodes[parseInt(match[1])]}-fore`, `${ColorCodes[parseInt(match[2])]}-back`];
          } else if (typeof match[1] !== 'undefined') {
            currentColour = `${ColorCodes[parseInt(match[1])]}-fore`;
          } else {
            currentColour = null;
          }
          lastIndex = match.index + match[0].length;
          innerSpans = [];
        }
      },
      {
        regex: WebsiteRegex,
        func: function(match) {
          let m = match[0];
          let index = match.index;
          if (match[0].match(/\s/)) {
            m = m.substring(1);
            index++;
          }
          innerSpans.push(message.substring(lastIndex, index));
          innerSpans.push(<a href={m} target="_blank">{m}</a>);
          lastIndex = match.index + match[0].length;
        }
      },
      {
        regex: ChannelRegex,
        func: function(match) {
          innerSpans.push(message.substring(lastIndex, match.index + 1));
          let m = match[0].substring(1);
          innerSpans.push(<ChannelLink channel={m}/>);
          lastIndex = match.index + match[0].length;
        }
      }
    ], message);
  multiRegex.exec();
  if (lastIndex < message.length)
    innerSpans.push(message.substring(lastIndex));
  if (currentColour) {
    outerSpans.push(<span className={currentColour}>{innerSpans}</span>);
  } else {
    outerSpans.push(...innerSpans)
  }
  return <span className="message-content body1">{outerSpans}</span>
}

export default class ChatListItem extends React.Component {
  render() {
    var message = this.props.message;
    return (
      <div className="chat-list-item">
          <span className="message-time caption">{(new Date(message.time)).format("h:MM TT")}</span>
          <span className="message-sender body2">{message.sender}</span>
          {parseMessage(message.content)}
      </div>
    );
  }

  shouldComponentUpdate() {
    return false;
  }
}
