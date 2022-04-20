import message from '../../class/message'
import {mapGenre} from '../../class/types/beatmap'
import {BEATMAP_MAPPING_GENRE} from '../../files/config.json'

/*commandManager?.create({
  name:"modifymapgenre",
  type:"CHAT_INPUT",
  description:"modify the genre of a beatmap -- staff only command!",
  options:[
    {
      name:"genre",
      description:"the new name of the waifu",
      required:true,
      type:"STRING"
    },
  ],
})*/

export default async function modifyMapGenre(message: message, args: Array<string>){
  const beatmap = await beatmaps.get(args[1])
  if(!beatmap) {message.addResponse("The map set wasn't found :/"); return true};
  if(!BEATMAP_MAPPING_GENRE.includes(args[2])) {message.addResponse("This map genre doesn't exist!"); }
  beatmap.mapGenre = args[2] as mapGenre
  beatmap.mapGenreAuthor = message.authorId
  beatmaps.put(args[2], beatmap)
}
