export interface Task {
    id: number;
    name: string;
    description: string;
    done: boolean;
  }


  export const tasks = [
    {
      id: 1,
      name: 'Phone XL',
      description: 'A large phone with one of the best screens',
      done:false,
    },
    {
      id: 2,
      name: 'Phone Mini',
      description: 'A great phone with one of the best cameras',
      done:false,
    },
    {
      id: 3,
      name: 'Phone Standard',
      description: '',
      done:false,
    },
  ];