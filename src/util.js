export const WebsiteRegex = /\bhttp:\/\/[^\s]+/g;
export const ChannelRegex = /\B#[^\s,]+/g

Array.prototype.minIndex = function(lambda) {
  if (typeof lambda === 'undefined') {
    lambda = e => e;
  }
  if (this.length === 0) return -1;
  let least = lambda(this[0], 0, this);
  let index = 0;
  for (let i = 1; i < this.length; i++) {
    let val = lambda(this[i], i, this);
    if (val < least) {
      index = i;
      least = val;
    }
  }
  return index;
}

Array.prototype.min = function(lambda) {
  let index = this.minIndex(lambda);
  if (index === -1) return null;
  return this[index];
}

Array.prototype.maxIndex = function(lambda) {
  if (typeof lambda === 'undefined') {
    lambda = e => e;
  }
  if (this.length === 0) return -1;
  let most = lambda(this[0], 0, this);
  let index = 0;
  for (let i = 1; i < this.length; i++) {
    let val = lambda(this[i], i, this);
    if (val > most) {
      index = i;
      most = val;
    }
  }
  return index;
}

Array.prototype.max = function(lambda) {
  let index = this.maxIndex(lambda);
  if (index === -1) return null;
  return this[index];
}
