export default function TaskContainer({ children, name }) {
  return (
    <fieldset className="fieldset mt-5 rounded-[20px] w-full border-2 p-4 text-2xl">
      <legend className="fieldset-legend -mb-3">{name}</legend>
      <ul className="list">{children}</ul>
    </fieldset>
  );
}
