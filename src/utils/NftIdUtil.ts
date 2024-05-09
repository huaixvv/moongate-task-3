import * as fs from "fs";

export class NftIdUtil {

  public static filepath = 'nft-id.txt'

  static getMaxId(): number {
    try {
      const data = fs.readFileSync(NftIdUtil.filepath, 'utf8');
      const lines = data.trim().split('\n');
      const maxId = lines.length > 0 ? parseInt(lines[lines.length - 1]) : -1;
      return maxId;
    } catch (err) {
      console.error('Error reading file:', err);
      return -1;
    }
  }

  static appendId(id: number): void {
    try {
      fs.appendFileSync(NftIdUtil.filepath, `${id}\n`);
      console.log(`Appended ID ${id} to file ${NftIdUtil.filepath}`);
    } catch (err) {
      console.error('Error appending ID to file:', err);
    }
  }
}
