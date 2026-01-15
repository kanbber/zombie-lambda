type FuncCals = {
  name: string;
  wait: number;
  isFailing?: boolean;
};
type Event = {
  elements: FuncCals[];
};

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

const zombieFunc = async (input: FuncCals): Promise<void> => {
  console.log(`before '${input.name}'`);
  await delay(input.wait);
  if (input.isFailing) {
    throw new Error('zombi');
  } else {
    console.log(`'${input.name}' done`);
  }
};

export async function handler(event: Event): Promise<void> {
  const res = await Promise.all(event.elements.map((ele) => zombieFunc(ele)));
  console.log(res);
}
