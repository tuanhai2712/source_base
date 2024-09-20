import React, { useEffect, useState } from 'react';

import { formatNumber } from '@/utils';
import { Col, Row, Spin, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import Item from '../components/Item';
import Deposit from './deposit';
import { InfoCircleIcon } from '@/assets';
import PageTitle from '@/components/PageTitle';
import MemberChart from './member-chart';

interface IProps {}

export const TotalBalance: React.FC<IProps> = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<any>({
    totalBalance: '',
    totalDeposit: '',
    totalWithdraw: '',
  });
  const [dataUser, setDataUser] = useState<any>({
    totalBalance: '',
    totalDeposit: '',
    totalWithdraw: '',
  });

  const getDataStatisticTotalTitan = async () => {
    setLoading(true);

    // const response = await getTotalBalanceStatistic([]);
    // if (response && response.success) {
    //   setData(response.data);
    // }
    setLoading(false);
  };
  const getDataStatisticTotalUser = async () => {
    setLoading(true);

    // const response = await getTotalBalanceUserStatistic([]);
    // if (response && response.success) {
    //   setDataUser(response.data);
    // }
    setLoading(false);
  };
  useEffect(() => {
    getDataStatisticTotalTitan();
    getDataStatisticTotalUser();
  }, []);

  return (
    <>
      <PageTitle pageTitle={t('Tổng sản lượng theo chu kỳ')} />
      <Row gutter={[14, 14]}>
        <Col span={12}>
          <div className="card-item">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="card-item__title">
                <span>{t('Total Titan wallet balance')}</span>

                <Tooltip
                  title={t(
                    'Total Titan wallet balance = total direct deposit amount + total deposit amount of users - total withdrawal amount of admins, users',
                  )}
                >
                  <InfoCircleIcon />
                </Tooltip>
              </div>
            </div>

            {loading ? (
              <Spin />
            ) : (
              <div className="card-item__total-text">
                {loading ? '-' : `$ ${formatNumber(parseFloat(data.totalBalance))}`}
              </div>
            )}

            <Item
              amount={loading ? '-' : `$ ${formatNumber(parseFloat(data.totalDeposit))}`}
              text={t('Total Titan wallet deposit')}
              description={t(
                'Total Titan wallet deposit = total direct deposit amount + total deposit amount of users',
              )}
            />
            <Item
              amount={loading ? '-' : `$ ${formatNumber(parseFloat(data.totalWithdraw))}`}
              text={t('Total Titan wallet withdrawal')}
              description={t('Total Titan wallet withdraw = total withdrawal amount of admins, users')}
            />
            <Deposit title={t('Titan wallet deposit')} type="titan" />
          </div>
        </Col>
        <Col span={12}>
          <div className="card-item">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="card-item__title">
                <span>{t('Total user wallet balance')}</span>
                <Tooltip title={t('Total available wallet balance of all users')}>
                  <InfoCircleIcon />
                </Tooltip>
              </div>
            </div>

            {loading ? (
              <Spin />
            ) : (
              <div className="card-item__total-text">
                {loading ? '-' : `$ ${formatNumber(parseFloat(dataUser.totalBalance))}`}
              </div>
            )}

            <Item
              amount={loading ? '-' : `$ ${formatNumber(parseFloat(dataUser.totalDeposit))}`}
              text={t('Total user wallet deposit')}
              description={t('Total deposit amount of users')}
            />
            <Item
              amount={loading ? '-' : `$ ${formatNumber(parseFloat(dataUser.totalWithdraw))}`}
              text={t('Total user wallet withdrawal')}
              description={t('Total withdrawal amount of users.')}
            />
            <Deposit title={t('User wallet deposit')} type="user" />
          </div>
        </Col>
        <Col span={12}>
          <MemberChart />
        </Col>
      </Row>
    </>
  );
};

export default TotalBalance;
