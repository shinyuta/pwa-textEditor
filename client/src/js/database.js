import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try{
    if (content===null){
      console.log('There is nothing to be saved');
    }else{
      console.log("Content", content);
      console.log("Sending to database!");
      const jateDB=await openDB('jate', 1);
      const tx = jateDB.transaction('jate', 'readwrite');
      const store = tx.objectStore('jate');
      const request = store.put({Value: content});
      const result = await request;
      console.log(`${result} added to the database`);
    }
  }catch(err){
    console.error('Error in adding data to the database', err);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () =>{
  try{
    console.log("Retrieving data from database, please wait");
    const jateDB=await openDB('jate', 1);
    const tx = jateDB.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;

    if(result.length===0){
      console.log('No Data Found!')
    }else{
      console.log('Data found!', result);
      return result
    }
    return result
  }catch(err){
    console.error('Error in retrieving data from the database', err);
  }
};

initdb();
