
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSkills, updateStep } from '../../../reducers/CreateProject';
import CommonSkillPage from '../../Common/CommonPage/CommonSkillPage';

const SkillsPage = () => {
  const { step, title } = useSelector((state) => state.createProject);
  const dispatch = useDispatch();

  return (
    <CommonSkillPage
      title={title}
      updateStep={step => dispatch(updateStep(step))}
      updateSkills={skills => dispatch(updateSkills(skills))}
      button2text="Move To Scope"
    />
  );
};

export default SkillsPage;
