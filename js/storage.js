const KEY = "transactions";

export const Storage = {

  save(data){

    localStorage.setItem(
      KEY,
      JSON.stringify(data)
    );
  },

  load(){

    return JSON.parse(
      localStorage.getItem(KEY)
    ) || [];
  }
};
