const ChildlessComp = () => <p>Static text</p>;

const CompWithChildren = (props) => <p className="border">{props.children}</p>;
// const CompWithChildren = ({ children }) => <p className="border">{children}</p>;

const ChildrenBefore = ({ children }) => (
  <>
    {children}
    <h1 className="border">I have children on my back!</h1>
  </>
);

const RenderChildren = ({ children, where }) => (
  <>
    {where === "before" ? children : null}
    <h1 className="border">Rendering children: {where}</h1>
    {where === "after" ? children : null}
  </>
);

export const Children = () => (
  <>
    <h1>Child prop</h1>

    {/* <ChildlessComp>I'm a childless component</ChildlessComp>
    <ChildlessComp>I'm a childless component</ChildlessComp>
    <ChildlessComp />

    <CompWithChildren>I'm a component with a child</CompWithChildren>
    <CompWithChildren />

    <CompWithChildren>
      <ChildlessComp />
      <CompWithChildren>Hello</CompWithChildren>
    </CompWithChildren> */}
    {/* 
    <ChildrenBefore>
      <p>First child</p>
      <p>Second child</p>
    </ChildrenBefore> */}

    {/* <RenderChildren where="before">
      <p style={{ color: "green" }}>Before child</p>
    </RenderChildren>

    <RenderChildren where="after">
      <p style={{ color: "blue" }}>After child</p>
    </RenderChildren>

    <RenderChildren where="nowhere">
      <p style={{ color: "red" }}>Nowhere child</p>
    </RenderChildren> */}
  </>
);
