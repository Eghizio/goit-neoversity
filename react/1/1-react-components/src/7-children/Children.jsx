const ChildlessComp = () => <p>Static text</p>;

// const CompWithChildren = (props) => <p class="border">{props.children}</p>;
const CompWithChildren = ({ children }) => <p class="border">{children}</p>;

const ChildrenBefore = ({ children }) => (
  <>
    {children}
    <h1 className="border">I have children on my back!</h1>
  </>
);

export const Children = () => (
  <>
    <h1>Child prop</h1>

    <ChildlessComp>I'm a childless component</ChildlessComp>
    <ChildlessComp>I'm a childless component</ChildlessComp>
    <ChildlessComp />

    <CompWithChildren>I'm a component with a child</CompWithChildren>
    <CompWithChildren />

    <CompWithChildren>
      <ChildlessComp />
      <CompWithChildren>Hello</CompWithChildren>
    </CompWithChildren>

    <ChildrenBefore>
      <p>First child</p>
      <p>Second child</p>
    </ChildrenBefore>
  </>
);
