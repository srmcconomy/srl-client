import fs from 'fs'
import UserStore from './stores/user-store'

class SettingsSerializer {
  save() {
    let data = { username: UserStore.getUsername(), password: UserStore.getPassword() }
    fs.writeFile('/data/data.json', JSON.stringify(data), err => console.log(err))
  }
  load() {
    fs.readFile(file, (err, data) => {
      if (err) console.log(err);
      let settings = JSON.parse(data);
      dispatcher.dispatch('set-username', )
    })
  }
}

export default new SettingsSerializer();
