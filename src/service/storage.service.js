import { useDispatch, useSelector } from "react-redux";
import {
  selectFaceRecognized,
  changeFaceRecognizedState,
} from "../redux/slices/FaceRecognized";
import { updateUser, deleteUser, selectUser } from "../redux/slices/User";

export class StorageService {
  user = useSelector(selectUser);
  faceRecognized = useSelector(selectFaceRecognized);
  dispatch = useDispatch();

  /*-----User-----*/
  storUserData = (userData) => {
    this.dispatch(updateUser(userData));
  };

  getUserData = () => {
    return this.user;
  };

  clearUserData = () => {
    this.dispatch(deleteUser());
  };

  /*-----Face Recognized-----*/
  setFaceRecognized = () => {
    this.dispatch(changeFaceRecognizedState(true));
  };

  unsetFaceRecognized = () => {
    this.dispatch(changeFaceRecognizedState(false));
  };

  getFaceRecognized = () => {
    return this.faceRecognized;
  };
}
