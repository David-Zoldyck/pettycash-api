import mjml2html from "mjml";

const authorizerMailer = (user, authorizer) => {
  return mjml2html(
    `
    <mjml>
      <mj-head>
        <mj-attributes>
          <mj-text padding="0px"></mj-text>
          <mj-class name="blue" color="blue"></mj-class>
          <mj-class name="big" font-size="20px"></mj-class>
          <mj-all font-family="Arial"></mj-all>
        </mj-attributes>
      </mj-head>
      <mj-body background-color="whitesmoke">
        <mj-section background-color="whitesmoke">
          <mj-column vertical-align="bottom">
            <mj-text><mj-class name="big blue">Hello, ${authorizer}</mj-class></mj-text>
          </mj-column>
        </mj-section>

        <mj-section background-color="whitesmoke">
          <mj-column>
            <mj-text><mj-class name="capitalize">${user}<mj-class> selected you as his pettycash form authorizer</mj-text>

          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `,
    {}
  ).html;
};

export default authorizerMailer;
