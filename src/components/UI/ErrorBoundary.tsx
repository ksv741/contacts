import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface ErrorBoundaryState {
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {error: null};
  }

  componentDidCatch(error: Error) {
    this.setState({error})
  }

  render() {
    return (
      this.state.error
        ? (
          <div>
            <Typography variant="h5" component="h5">
              {this.state.error.message}
            </Typography>
            <Link to='/'>
              <Typography variant="button" display="block" gutterBottom sx={{mt: 2}}> Перейти на главную страницу</Typography></Link>
          </div>
        )
        : this.props.children
    );
  }
}
