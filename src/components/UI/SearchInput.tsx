import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import React, { ReactComponentElement } from 'react';

interface SearchInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  placeholder?: string;
  icon?: ReactComponentElement<any>;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange, defaultValue, placeholder, icon }) => {
  return (
    <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mb: '10px' }}>
      <IconButton>
        {icon}
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder || ''}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </Paper>
  );
};

export default SearchInput;
