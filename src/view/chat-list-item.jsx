import React from 'react'
import dateformat from '../dateformat'
import dispatcher from '../dispatcher'
import ChannelLink from './channel-link'
import { ColorCodes, ColorCodeRegex, FormatCodes, FormatRegex, PlainChar } from '../color-util'
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
  var outerSpans = [];
  let innerSpans = [];
  var lastIndex = 0;
  var currentColour = null;
  let currentFormatting = {};
  for (let format in FormatCodes) {
    currentFormatting[format] = false;
  }
  let multiRegex = new MultiRegex(
    [
      {
        regex: ColorCodeRegex,
        func: function(match) {
          if (lastIndex !== match.index) {
            innerSpans.push(message.substring(lastIndex, match.index));
            let classes = [currentColour];
            for (let format in currentFormatting) {
              if (currentFormatting[format]) classes.push(format);
            }
            if (classes.length > 0) {
              outerSpans.push(<span className={classes.join(' ')}>{innerSpans}</span>);
            } else {
              outerSpans.push(...innerSpans)
            }
            innerSpans = [];
          }
          if (typeof match[2] !== 'undefined' && typeof match[1] !== 'undefined') {
            currentColour = `${ColorCodes[parseInt(match[1])]}-fore ${ColorCodes[parseInt(match[2])]}-back`;
          } else if (typeof match[1] !== 'undefined') {
            currentColour = `${ColorCodes[parseInt(match[1])]}-fore`;
          } else {
            currentColour = null;
          }
          lastIndex = match.index + match[0].length;
        }
      },
      {
        regex: FormatRegex,
        func: function(match) {
          if (lastIndex !== match.index) {
            innerSpans.push(message.substring(lastIndex, match.index));
            let classes = [currentColour];
            for (let format in currentFormatting) {
              if (currentFormatting[format]) classes.push(format);
            }
            if (classes.length > 0) {
              outerSpans.push(<span className={classes.join(' ')}>{innerSpans}</span>);
            } else {
              outerSpans.push(...innerSpans)
            }
            innerSpans = [];
          }
          if (match[0] === PlainChar) {
            for (let format in currentFormatting) {
              currentFormatting[format] = false;
            }
          } else {
            currentFormatting[FormatCodes[match[0]]] = !currentFormatting[FormatCodes[match[0]]];
          }
          lastIndex = match.index + match[0].length;
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
  let classes = [currentColour, ...currentFormatting];
  if (lastIndex < message.length)
    innerSpans.push(message.substring(lastIndex));
  if (classes.length > 0) {
    outerSpans.push(<span className={classes.join(' ')}>{innerSpans}</span>);
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
