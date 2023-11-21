import {
  Cellule,
  H2,
  Layout,
  Loader,
  TableHeader,
  TableHeaderItem,
  TableRow,
} from '@/components';
import { ROUTES } from '@/routing';
import { ApiService } from '@/services/api';
import { BillingPlanDto } from '@/types';
import { useTranslation } from 'next-i18next';
import router from 'next/router';
import React, { useEffect, useState } from 'react';

export function ListBillingPlanPage(): React.JSX.Element {
  const [billingPlans, setBillingPlans] = useState<BillingPlanDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rowTableHover, setRowTableHover] = useState<string>();
  const { t } = useTranslation();

  async function fetchBillingPlans() {
    setIsLoading(true);
    const fetchedbillingPlans = await ApiService.billingPlans.getAll();
    setBillingPlans(fetchedbillingPlans);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchBillingPlans();
  }, []);

  const nbColumns = 'grid-cols-3';

  return (
    <Layout selected={ROUTES.billingPlans.list}>
      <H2 className='mb-7'>{t('billingPlans.list.title')}</H2>
      <TableHeader className={`${nbColumns} mt-2`}>
        <TableHeaderItem>{t('billingPlans.list.table.title')}</TableHeaderItem>
        <TableHeaderItem>{t('billingPlans.list.table.price')}</TableHeaderItem>
        <TableHeaderItem>{t('billingPlans.list.table.type')}</TableHeaderItem>
      </TableHeader>
      {billingPlans.length > 0 &&
        !isLoading &&
        billingPlans.map((billingPlan: BillingPlanDto) => (
          <TableRow
            className={nbColumns}
            onMouseEnter={() => setRowTableHover(billingPlan.id)}
            onMouseLeave={() => setRowTableHover(undefined)}
            key={billingPlan.id}
            onClick={() =>
              router.push(ROUTES.billingPlans.detail(billingPlan.type))
            }
          >
            <Cellule $isFocus={rowTableHover === billingPlan.id}>
              {billingPlan.title}
            </Cellule>

            <Cellule $isFocus={rowTableHover === billingPlan.id}>
              {`${billingPlan.price}€`}
            </Cellule>
            <Cellule $isEnum $isFocus={rowTableHover === billingPlan.id}>
              {t(`enums.billingPlan.${billingPlan.type}`)}
            </Cellule>
          </TableRow>
        ))}
      {isLoading && (
        <TableRow className={nbColumns}>
          {Array(3)
            .fill(null)
            .map((e) => (
              <Cellule key={e}>
                <Loader size={5} />
              </Cellule>
            ))}
        </TableRow>
      )}
      {billingPlans.length === 0 && !isLoading && (
        <TableRow className={nbColumns}>
          <Cellule>{t('billingPlans.list.noResult')}</Cellule>
        </TableRow>
      )}
    </Layout>
  );
}
