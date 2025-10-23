import "server-only"
import { files_table as filesSchema, folders_table as foldersSchema, type DB_FileType } from "~/server/db/schema"
import { db } from "~/server/db"
import { eq } from "drizzle-orm"

export const QUERIES = {

getAllParentsForFolder: async function (folderId: number) {
  // Fetch all folders once, then traverse in memory
  const allFolders = await db
    .select()
    .from(foldersSchema)
    .execute();
  
  const folderMap = new Map(allFolders.map(f => [f.id, f]));
  const parents = [];
  let currentId: number | null = folderId;
  
  // Traverse in memory (fast) instead of making DB queries
  while (currentId !== null) {
    const folder = folderMap.get(currentId);
    if (!folder) break;
    parents.unshift(folder);
    currentId = folder.parent;
  }
  
  return parents;
},
    // const parsedFolderId = parseInt(params.folderId);

    getFiles : function (folderId:number)
    {return db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, folderId));
},
    
    getFolders : function (folderId:number) { 
    return db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, folderId))}
}

export const MUTATIONS = {
  createFile: async function (input:{file:{
    name:string;
    size:number;
    url:string;
    parent:number;
  };
userId:string;}) {
    return await db.insert(filesSchema).values({...input.file,
      parent:input.file.parent,}
    )
  }
}