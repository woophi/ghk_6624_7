import { Button } from '@alfalab/core-components/button/cssm';
import { Collapse } from '@alfalab/core-components/collapse/cssm';
import { Divider } from '@alfalab/core-components/divider/cssm';
import { Gap } from '@alfalab/core-components/gap/cssm';
import { Grid } from '@alfalab/core-components/grid/cssm';
import { PureCell } from '@alfalab/core-components/pure-cell/cssm';
import { Slider } from '@alfalab/core-components/slider/cssm';
import { Steps } from '@alfalab/core-components/steps/cssm';
import { Tag } from '@alfalab/core-components/tag/cssm';
import { Typography } from '@alfalab/core-components/typography/cssm';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronUpMIcon } from '@alfalab/icons-glyph/ChevronUpMIcon';
import { useEffect, useState } from 'react';
import fileImg from './assets/file.png';
import hb from './assets/hb.png';
import houseImg from './assets/house.png';
import tabplusImg from './assets/tabplus.png';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { formatWord } from './utils/words';

import { CheckmarkCircleSIcon } from '@alfalab/icons-glyph/CheckmarkCircleSIcon';

const SLIDER_SUM = {
  default: 500_000,
  min: 1_000,
  max: 10_000_000,
  step: 1_000,
};

const PERCENT = 0.1801;
const faqs = [
  {
    question: 'Есть ли комиссия?',
    answer: ['Комиссия удерживается согласно вашему тарифу брокерского обслуживания.'],
  },
  {
    question: 'Как выплачивается доход?',
    answer: ['Доход начисляется на брокерский счет.'],
  },
  {
    question: 'Есть ли налог?',
    answer: ['Налог начисляется на доход.'],
  },
  {
    question: 'Можно ли вывести деньги до конца срока?',
    answer: ['Можно. Накопленный доход сохраняется.'],
  },
];

const advantages = [
  {
    title: 'Высокая доходность',
    description: 'Зафиксируйте выгодную ставку на срок от 1 до 10 лет',
    img: houseImg,
  },
  {
    title: 'Дополнительный доход',
    description: 'Получайте прибыль от возможного роста стоимости облигации',
    img: fileImg,
  },
  {
    title: 'Лёгкий старт',
    description: 'Начать можно с 1000 ₽',
    img: tabplusImg,
  },
];

const LINK = 'alfabank://investments/open_investments_account?type=BS';

const tags = [
  { key: 'ofz', label: 'ОФЗ' },
  { key: 'banks', label: 'Банки' },
  { key: 'companies', label: 'Компании' },
];

const tagsData = {
  ofz: {
    title: 'Облигации федерального займа',
    subtitle: 'Самый надёжный инструмент на рынке',
    leftTitle: 'Доходность',
    leftValue: '12-15%',
    rightTitle: 'Риск',
    rightValue: 'Минимальный',
    rows: ['Гарантия государства', 'Высокая ликвидность', 'Для осторожных инвесторов'],
  },

  banks: {
    title: 'Облигации крупных банков',
    subtitle: 'Баланс надёжности и доходности',
    leftTitle: 'Доходность',
    leftValue: '15-17%',
    rightTitle: 'Риск',
    rightValue: 'Минимальный',
    rows: ['Крупнейшие банки России', 'Регулярные купоны', 'Оптимальный выбор'],
  },
  companies: {
    title: 'Корпоративные облигации',
    subtitle: 'Максимальная доходность',
    leftTitle: 'Доходность',
    leftValue: '16-18%',
    rightTitle: 'Риск',
    rightValue: 'Средний',
    rows: ['Крупнейшие компании', 'Высокий доход', 'Для опытных инвесторов'],
  },
};

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [sliderSum, setSliderSum] = useState(SLIDER_SUM.default);
  const [sliderTerm, setSliderTerm] = useState(12);
  const [collapsedItems, setCollapsedItem] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<'ofz' | 'banks' | 'companies'>('ofz');

  useEffect(() => {
    if (!LS.getItem(LSKeys.UserId, null)) {
      LS.setItem(LSKeys.UserId, Date.now());
    }
  }, []);

  const incomeProfitWithSum = Math.floor(((sliderSum * PERCENT) / 12) * sliderTerm);
  const tagData = tagsData[selectedTag];

  const submit = () => {
    window.gtag('event', '6624_card_activate', { var: 'var2' });
    setLoading(true);

    // sendDataToGA({
    //   autopayments: Number(checked) as 1 | 0,
    //   limit: Number(checked2) as 1 | 0,
    //   limit_sum: limit ?? 0,
    //   insurance: Number(checked3) as 1 | 0,
    //   email: email ? 1 : 0,
    // }).then(() => {
    //   LS.setItem(LSKeys.ShowThx, true);
    //   setThx(true);
    //   setLoading(false);
    // });
    LS.setItem(LSKeys.ShowThx, true);
    window.location.replace(LINK);
    setLoading(false);
  };

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.box}>
          <Typography.TitleResponsive tag="h1" view="large" font="system" weight="semibold">
            Облигации
          </Typography.TitleResponsive>
          <Typography.Text view="primary-small" color="secondary">
            Это «заём» государству или компании: вы даёте деньги под процент и к сроку получаете купоны и возврат номинала
          </Typography.Text>

          <img src={hb} alt="hb" width="100%" height={133} style={{ objectFit: 'contain' }} />
        </div>

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Преимущества
        </Typography.TitleResponsive>

        {advantages.map((adv, index) => (
          <PureCell key={index}>
            <PureCell.Graphics verticalAlign="center">
              <img src={adv.img} width={48} height={48} alt="house" />
            </PureCell.Graphics>
            <PureCell.Content>
              <PureCell.Main>
                <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="semibold">
                  {adv.title}
                </Typography.TitleResponsive>

                <Typography.Text view="primary-small" color="secondary">
                  {adv.description}
                </Typography.Text>
              </PureCell.Main>
            </PureCell.Content>
          </PureCell>
        ))}

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Сравните
        </Typography.TitleResponsive>

        <div className={appSt.boxTable}>
          <div className={appSt.boxTableCell()}>
            <Typography.Text view="primary-small" weight="bold" style={{ marginBottom: '12px' }}>
              Депозит
            </Typography.Text>
            <Typography.Text view="secondary-medium">До 16% годовых</Typography.Text>
            <Divider />
            <Typography.Text style={{ height: 32 }} view="secondary-medium">
              Выплата в конце срока
            </Typography.Text>
            <Divider />
            <Typography.Text style={{ height: 48 }} view="secondary-medium">
              Страхование АСВ
            </Typography.Text>
            <Divider />
            <Typography.Text view="secondary-medium">Потеря % при досрочном снятии</Typography.Text>
          </div>
          <div className={appSt.boxTableCell({ filled: true })}>
            <Typography.Text view="primary-small" weight="bold" style={{ marginBottom: '12px' }}>
              Квазидепозит
            </Typography.Text>
            <Typography.Text view="secondary-medium">До 18% годовых</Typography.Text>
            <Divider />
            <Typography.Text style={{ height: 32 }} view="secondary-medium">
              Выплата каждый месяц, неделю
            </Typography.Text>
            <Divider />
            <Typography.Text style={{ height: 48 }} view="secondary-medium">
              Выплаты гарантированы эмитентом
            </Typography.Text>
            <Divider />
            <Typography.Text view="secondary-medium">Накопленный доход сохраняется</Typography.Text>
          </div>
        </div>

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Как это работает
        </Typography.TitleResponsive>

        <Steps isVerticalAlign={true} interactive={false} className={appSt.stepStyle}>
          <span>
            <Typography.Text tag="p" defaultMargins={false} view="component-primary">
              Открываете брокерский счет
            </Typography.Text>
            <Typography.Text view="primary-small" color="secondary">
              Прям в мобильном приложении банка
            </Typography.Text>
          </span>
          <span>
            <Typography.Text tag="p" defaultMargins={false} view="component-primary">
              Покупаете облигации
            </Typography.Text>
            <Typography.Text view="primary-small" color="secondary">
              Подобрали для вас наиболее интересные
            </Typography.Text>
          </span>
          <span>
            <Typography.Text tag="p" defaultMargins={false} view="component-primary">
              Получаете доход
            </Typography.Text>
            <Typography.Text view="primary-small" color="secondary">
              Проценты начисляются ежедневно на ваш счёт
            </Typography.Text>
          </span>
        </Steps>

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Типы облигаций
        </Typography.TitleResponsive>

        <div className={appSt.tags}>
          {tags.map(itemTag => (
            <Tag
              size="s"
              view="outlined"
              shape="rectangular"
              checked={selectedTag === itemTag.key}
              onClick={() => setSelectedTag(itemTag.key as typeof selectedTag)}
              key={itemTag.key}
            >
              {itemTag.label}
            </Tag>
          ))}
        </div>

        <div className={appSt.boxCalc}>
          <div>
            <Typography.TitleResponsive tag="h5" view="xsmall" font="system" weight="semibold">
              {tagData.title}
            </Typography.TitleResponsive>
            <Typography.Text view="primary-small" color="secondary">
              {tagData.subtitle}
            </Typography.Text>
          </div>

          <Grid.Row gutter={{ mobile: 8, desktop: 16 }}>
            <Grid.Col width="6">
              <div className={appSt.gridItemBox}>
                <Typography.Text view="secondary-medium" color="secondary">
                  {tagData.leftTitle}
                </Typography.Text>
                <Typography.Text view="primary-small" weight="medium">
                  {tagData.leftValue}
                </Typography.Text>
              </div>
            </Grid.Col>
            <Grid.Col width="6">
              <div className={appSt.gridItemBox}>
                <Typography.Text view="secondary-medium" color="secondary">
                  {tagData.rightTitle}
                </Typography.Text>
                <Typography.Text view="primary-small" weight="medium">
                  {tagData.rightValue}
                </Typography.Text>
              </div>
            </Grid.Col>
          </Grid.Row>

          <div>
            {tagData.rows.map((row, index) => (
              <div className={appSt.row} key={index}>
                <CheckmarkCircleSIcon />

                <Typography.Text view="primary-small">{row}</Typography.Text>
              </div>
            ))}
          </div>
        </div>

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Расчитайте доход
        </Typography.TitleResponsive>

        <div className={appSt.boxCalc}>
          <div>
            <div className={appSt.rowSb}>
              <Typography.Text view="primary-medium" color="secondary">
                Сумма инвестиций
              </Typography.Text>
              <Typography.Text view="primary-medium" weight="medium">
                {sliderSum.toLocaleString('ru')} ₽
              </Typography.Text>
            </div>
            <div style={{ marginTop: '12px' }}>
              <Slider
                size={4}
                value={sliderSum}
                step={SLIDER_SUM.step}
                min={SLIDER_SUM.min}
                max={SLIDER_SUM.max}
                onChange={({ value }) => setSliderSum(value)}
              />
            </div>
          </div>

          <div>
            <div className={appSt.rowSb}>
              <Typography.Text view="primary-medium" color="secondary">
                Срок
              </Typography.Text>
              <Typography.Text view="primary-medium" weight="medium">
                {formatWord(sliderTerm, ['месяц', 'месяца', 'месяцев'])}
              </Typography.Text>
            </div>
            <div style={{ marginTop: '12px' }}>
              <Slider
                size={4}
                value={sliderTerm}
                min={0}
                max={120}
                step={1}
                onChange={({ value }) => setSliderTerm(value)}
              />
            </div>
          </div>

          <div className={appSt.rowSb}>
            <Typography.Text view="primary-medium" color="secondary">
              Потенциальный доход
            </Typography.Text>
            <Typography.Text view="primary-medium" weight="medium">
              {incomeProfitWithSum.toLocaleString('ru')} ₽
            </Typography.Text>
          </div>
        </div>

        <Typography.Text view="secondary-large" color="secondary">
          Расчёт дохода примерный, деньги можно снять в любой момент
        </Typography.Text>

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Дополнительные вопросы
        </Typography.TitleResponsive>

        {faqs.map((faq, index) => (
          <div key={index}>
            <div
              onClick={() => {
                window.gtag('event', '6624_card_faq', { faq: String(index + 1), var: 'var7' });

                setCollapsedItem(items =>
                  items.includes(String(index + 1))
                    ? items.filter(item => item !== String(index + 1))
                    : [...items, String(index + 1)],
                );
              }}
              className={appSt.rowSb}
            >
              <Typography.Text view="primary-medium" weight="medium">
                {faq.question}
              </Typography.Text>
              {collapsedItems.includes(String(index + 1)) ? (
                <div style={{ flexShrink: 0 }}>
                  <ChevronUpMIcon />
                </div>
              ) : (
                <div style={{ flexShrink: 0 }}>
                  <ChevronDownMIcon />
                </div>
              )}
            </div>
            <Collapse expanded={collapsedItems.includes(String(index + 1))}>
              {faq.answer.map((answerPart, answerIndex) => (
                <Typography.Text key={answerIndex} tag="p" defaultMargins={false} view="primary-medium">
                  {answerPart}
                </Typography.Text>
              ))}
            </Collapse>
          </div>
        ))}
      </div>
      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <Button loading={loading} block view="primary" onClick={submit}>
          Открыть счет
        </Button>
      </div>
    </>
  );
};
