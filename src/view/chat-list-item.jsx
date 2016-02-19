import React from 'react'
import dateformat from '../dateformat'
import { ColorCodes, ColorCodeRegex } from '../color-util'
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
      if (exec) next.push({exec: regex.exec(string), func: func});
    }
    while (next.length) {
      let index = next.minIndex(e => e.exec.index)
      next.splice(index, 1)
      next[index].func(next[index].exec);
    }
  }
}

function parseMessage(message) {
  let elem = <span className="message-content body1"></span>
  var outerSpans = [];
  let innerSpans = [];
  var lastIndex = 0;
  var currentColour = null;
  let multiRegex = new MultiRegex(
    [
      {
        regex: ColorCodeRegex,
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
        }
      },
      {
        regex: WebsiteRegex,
        func: function(match) {
          innerSpans.push(message.substring(lastIndex, match.index));
          innerSpans.push(<a href={match[0]} target="_blank"><b>{match[0]}</b></a>);
          lastIndex = match.index + match[0].length;
        }
      },
      {
        regex: ChannelRegex,
        func: function(match) {
          innerSpans.push(message.substring(lastIndex, match.index));
          innerSpans.push(<a href={match[0]}><b>{match[0]}</b></a>);
          lastIndex = match.index + match[0].length;
        }
      }
    ], message);
  multiRegex.exec();
  if (lastIndex < message.length) {
    innerSpans.push(message.substring(lastIndex, message.length));
    if (currentColour) {
      outerSpans.push(<span className={currentColour}>{innerSpans}</span>);
    } else {
      outerSpans.push(...innerSpans)
    }
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
          {parseMessage(message)}
      </div>
    );
  }

  shouldComponentUpdate() {
    return false;
  }
}
