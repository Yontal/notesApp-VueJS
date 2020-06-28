export const pullNotes = () => {
  const promise = new Promise((resolve, reject) => {
    if (localStorage.getItem("notes")) {
      try {
        let notes = JSON.parse(localStorage.getItem("notes"));
        resolve(notes);
      } catch (err) {
        localStorage.removeItem("notes");
        reject(err);
      }
    }
  });
  return promise;
};

export const saveNotes = (notes) => {
  const promise = new Promise((resolve, reject) => {
    if (!notes) {
      reject("notes undefined");
    }
    try {
      let JSONnotes = JSON.stringify(notes);
      localStorage.setItem('notes', JSONnotes);
      resolve('successfully saved');
    } catch (err) {
      localStorage.removeItem("notes");
      reject(err);
    }
  });
  return promise;
};
