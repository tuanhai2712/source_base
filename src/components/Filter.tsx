import { ArrowDownIcon, CloseIcon, FilterIcon, FilterWhiteIcon } from '@/assets';
import { Button, Drawer, Radio, RadioChangeEvent, Select } from 'antd';
import React, { useCallback, useState } from 'react';

interface IItem {
  name: string;
  key: string | number;
}
interface IOptionItem {
  label: string;
  filterKey: string | string[];
  items?: IItem[];
  type?: string | 'date';
}
interface IFilter {
  action: (arr: { value: string; key: string }[]) => void;
  filterSelected: any;
  options: IOptionItem[];
}
const { Option } = Select;
export const Filter: React.FC<IFilter> = ({ action, filterSelected, options }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSelect = (e: RadioChangeEvent, key: string) => {
    const { value } = e.target;
    action([{ value, key }]);
  };
  const handleSelectCountries = (value: string[]) => {
    action([{ value: value.toString(), key: 'country' }]);
  };

  const handleSelectDate = (arr: { value: string; key: string }[]) => {
    action(arr);
  };

  const renderTotalFilter = useCallback(() => {
    const checklist = options.map((i) => i.filterKey);
    let total = 0;
    for (let index = 0; index < checklist.length; index++) {
      const element = checklist[index];
      if (element.length && typeof element === 'object') {
        let totalHasValue = 0;
        for (let eIndex = 0; eIndex < element.length; eIndex++) {
          const value = element[eIndex];
          if (filterSelected[value]) {
            totalHasValue = totalHasValue + 1;
          }
        }
        if (totalHasValue === element.length) {
          total = total + 1;
        }
      } else {
        if (filterSelected[element as string]) {
          total = total + 1;
        }
      }
    }
    if (total) {
      return `(${total})`;
    }
    return '';
  }, [filterSelected, options]);

  return (
    <div>
      <Button className="btn-filter" size="large" type="default" onClick={showDrawer}>
        <FilterIcon />
        {`Filter ${renderTotalFilter()}`}
      </Button>
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FilterWhiteIcon />
            <span style={{ marginLeft: 5 }}>{`Filter ${renderTotalFilter()}`}</span>
          </div>
        }
        placement="right"
        onClose={onClose}
        open={open}
        closeIcon={<CloseIcon />}
      >
        {options.map((data: any, dataIdx: number) => {
          if (data.type === 'date') {
            return (
              <div key={String(dataIdx + 1)}>
                <div className="titan-filter-label">{data.label}</div>
              </div>
            );
          }
          if (data.type === 'select') {
            return (
              <div key={String(dataIdx + 1)}>
                <div className="titan-filter-label">{data.label}</div>
                <div style={{ position: 'relative' }}>
                  <Select
                    value={filterSelected[data.filterKey] ? filterSelected[data.filterKey].split(',') : []}
                    placeholder={'All'}
                    className="titan-select"
                    popupClassName={'titan-select__popup'}
                    mode="multiple"
                    style={{ width: '100%' }}
                    onChange={handleSelectCountries}
                  >
                    {data.items?.map((item: IItem) => (
                      <Option key={item.key} value={item.key}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                  <div style={{ position: 'absolute', top: 14, right: 8 }}>
                    <ArrowDownIcon />
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div key={String(dataIdx + 1)}>
              <div className="titan-filter-label">{data.label}</div>
              <div>
                {data.items.map((item: IItem, itemIdx: number) => {
                  return (
                    <div key={String(itemIdx + 1)} style={{ margin: '10px 0px' }}>
                      <Radio
                        value={item.key}
                        checked={String(filterSelected[data.filterKey]) === String(item.key)}
                        onChange={(e) => handleSelect(e, data.filterKey)}
                      >
                        {item.name}
                      </Radio>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Drawer>
    </div>
  );
};

export default Filter;
