import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
const StyledButton = styled(Button)`
  background: linear-gradient(90deg, rgba(161,179,104,1) 0%, rgba(210,25,190,1) 54%, rgba(189,69,138,1) 100%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;
export default StyledButton

export const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(`hsla(14, 100%, 53%)`),
    backgroundColor: `hsla(14, 100%, 53%)`,
    '&:hover': {
      backgroundColor: `hsla(14, 100%, 53%)`,
    },
  },
}))(Button);