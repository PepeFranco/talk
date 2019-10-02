import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";

import MainLayout from "coral-admin/components/MainLayout";
import { HOTKEYS } from "coral-admin/constants";
import { PropTypesOf } from "coral-framework/types";
import { SubBar } from "coral-ui/components/SubBar";
import key from "keymaster";

import HotkeysModal from "./HotkeysModal";
import ModerateNavigationContainer from "./ModerateNavigation";
import ModerateSearchBarContainer from "./ModerateSearchBar";

import styles from "./Moderate.css";

interface Props {
  story: PropTypesOf<typeof ModerateNavigationContainer>["story"] &
    PropTypesOf<typeof ModerateSearchBarContainer>["story"];
  moderationQueues: PropTypesOf<
    typeof ModerateNavigationContainer
  >["moderationQueues"];
  allStories: boolean;
  children?: React.ReactNode;
}

const Moderate: FunctionComponent<Props> = ({
  moderationQueues,
  story,
  allStories,
  children,
}) => {
  const [showHotkeysModal, setShowHotkeysModal] = useState(false);
  const closeModal = useCallback(() => {
    setShowHotkeysModal(false);
  }, []);
  const openModal = useCallback(() => {
    setShowHotkeysModal(true);
  }, []);

  useEffect(() => {
    key(HOTKEYS.GUIDE, openModal);
  }, []);
  return (
    <div data-testid="moderate-container">
      <ModerateSearchBarContainer story={story} allStories={allStories} />
      <SubBar data-testid="moderate-tabBar-container">
        <ModerateNavigationContainer
          moderationQueues={moderationQueues}
          story={story}
        />
      </SubBar>
      <div className={styles.background} />
      <MainLayout data-testid="moderate-main-container">
        <main className={styles.main}>{children}</main>
      </MainLayout>
      <HotkeysModal open={showHotkeysModal} onClose={closeModal} />
    </div>
  );
};

export default Moderate;
