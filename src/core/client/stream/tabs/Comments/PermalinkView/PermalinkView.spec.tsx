import { noop } from "lodash";
import React from "react";
import { createRenderer } from "react-test-renderer/shallow";

import { PropTypesOf } from "coral-framework/types";

import { removeFragmentRefs } from "coral-framework/testHelpers";
import PermalinkView from "./PermalinkView";

const PermalinkViewN = removeFragmentRefs(PermalinkView);

it("renders correctly", () => {
  const props: PropTypesOf<typeof PermalinkViewN> = {
    viewer: {},
    story: {},
    settings: {},
    comment: {},
    showAllCommentsHref: "http://localhost/link",
    onShowAllComments: noop,
  };
  const renderer = createRenderer();
  renderer.render(<PermalinkViewN {...props} />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it("renders comment not found", () => {
  const props: PropTypesOf<typeof PermalinkViewN> = {
    viewer: {},
    story: {},
    settings: {},
    comment: null,
    showAllCommentsHref: "http://localhost/link",
    onShowAllComments: noop,
  };
  const renderer = createRenderer();
  renderer.render(<PermalinkViewN {...props} />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});
