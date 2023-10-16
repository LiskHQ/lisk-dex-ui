import React from 'react';
import { utils as cryptographyUtils } from '@liskhq/lisk-cryptography';
import { validateAddress, generateUniqueId } from 'utils';
import { Gradients, gradientSchemes } from './gradients';

const styles: any = {
  wrapper: {
    display: 'inline-block',
    borderRadius: '100%',
    transition: 'transform ease-in-out 500ms',
  },
  walletVisual: {
    borderRadius: '100%',
    overflow: 'hidden',
    display: 'inline-block',
  },
  placeholder: {
    backgroundColor: 'var(--color-platinum)',
    borderRadius: '50%',
    display: 'inline-block',
  },

}

const round = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

/*
 * Account Visual
 *
 * The account visual is an svg image generated based on account address.
 *
 * The account visual randomly selects one of 8 color schemes defined in ./gradients
 * Each color scheme consists of
 * - 2 primary colors for the 2 big shapes,
 * - 4 secondary colors for the 2 small shapes
 *
 *
 * It contains 4 shapes (in this order from background to foreground):
 * - Circle of size 1 and random primary color
 * - A random shape of base size 1 of primary color other then previous
 * - A random shape of base size 0.23 and one secondary color
 * - A random shape of base size 0.18 and other secondary color
 *
 * The base size of random shapes is multiplied by a random scale factor
 * from range 1.2, 1.3, ..., 2.0, 2.1
 *
 * Possible shapes are: Square, Triangle, Circle
 *
 * Each shape is randomly rotated around the center of the account visual.
 *
 * Randomness of each step is defined by a part of decimal representation of sha256 hash of address.
 * If there are 10 options to choose from then 1 digit is used.
 * If there are 3 or 4 options to choose from then 2 digits is used
 * to give more even distribution, because e.g. with 1 digit and 3 options
 * the first option has 4/10 chance and each of other two has 3/10 chance.
 */

const Rect = (props: React.SVGProps<SVGRectElement>) => <rect {...props} />;
const Circle = (props: React.SVGProps<SVGCircleElement>) => <circle {...props} />;
const Polygon = (props: React.SVGProps<SVGPolygonElement>) => <polygon {...props} />;

const computeTriangle = (props: any) => ({
  points: [
    {
      x: props.x,
      y: props.y,
    },
    {
      x: props.x + props.size,
      y: props.y + props.size / 4,
    },
    {
      x: props.x + props.size / 4,
      y: props.y + props.size,
    },
  ]
    .map(({ x, y }) => `${x},${y}`)
    .join(' '),
});

const computePentagon = (props: any) => ({
  points: [
    {
      x: round(props.x + props.size / 2),
      y: props.y,
    },
    {
      x: props.x + props.size,
      y: props.y + props.size / 2.5,
    },
    {
      x: round(props.x + (props.size - props.size / 5)),
      y: props.y + props.size,
    },
    {
      x: round(props.x + props.size / 5),
      y: props.y + props.size,
    },
    {
      x: props.x,
      y: round(props.y + props.size / 2.5),
    },
  ]
    .map(({ x, y }) => `${x},${y}`)
    .join(' '),
});

const getShape = (chunk: any, size: number, gradient: any, sizeScale = 1) => {
  const shapeNames = ['circle', 'triangle', 'square'];

  const sizes = [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1].map((x) =>
    round(x * size * sizeScale)
  );

  const coordinates = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((x) => x * (size / 40));

  const shapes = {
    circle: {
      component: Circle,
      props: {
        cx: coordinates[chunk[1]] + sizes[chunk[3]] / 2,
        cy: coordinates[chunk[2]] + sizes[chunk[3]] / 2,
        r: sizes[chunk[3]] / 2,
      },
    },
    square: {
      component: Rect,
      props: {
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        height: sizes[chunk[3]],
        width: sizes[chunk[3]],
      },
    },
    rect: {
      component: Rect,
      props: {
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        height: sizes[chunk[3]],
        width: sizes[chunk[4]],
      },
    },
    triangle: {
      component: Polygon,
      props: computeTriangle({
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        size: sizes[chunk[3]],
      }),
    },
    pentagon: {
      component: Polygon,
      props: computePentagon({
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        size: sizes[chunk[3]],
      }),
    },
  };

  return {
    component: shapes[shapeNames[chunk.substr(0, 2) % shapeNames.length]].component,
    props: {
      ...shapes[shapeNames[chunk.substr(0, 2) % shapeNames.length]].props,
      fill: gradient.url,
      transform: `rotate(${chunk.substr(1, 2) * 3.6}, ${size / 2}, ${size / 2})`,
    },
  };
};

const getBackgroundCircle = (size: number, gradient: any) => ({
  component: Circle,
  props: {
    cx: size / 2,
    cy: size / 2,
    r: size / 2,
    fill: gradient.url,
  },
});

const pickTwo = (chunk: any, options: string) => [
  options[chunk.substr(0, 2) % options.length],
  options[
  (chunk.substr(0, 2) - 0 + 1 + (chunk.substr(2, 2) % (options.length - 1))) % options.length
  ],
];

const getHashChunks = (address: string) => {
  const addressHashHex = cryptographyUtils.hash(Buffer.from(address, 'utf-8')).toString('hex');
  const addressHashChunks = BigInt(`0x${addressHashHex}`).toString().substring(3);
  return addressHashChunks.match(/\d{5}/g);
};

function replaceUrlByHashOnScheme(uniqueSvgUrlHash: string, gradientScheme: any) {
  const id = `${gradientScheme.id}-${uniqueSvgUrlHash}`;
  return {
    ...gradientScheme,
    id,
    url: `url(#${id})`,
  };
}

export interface IWalletVisualProps {
  address: string,
  size: number,
  className?: string,
  placeholder?: string,
  isMediumViewPort?: boolean,
  disabled?: boolean,
}

export interface IWalletVisualState {
}

class WalletVisual extends React.Component<IWalletVisualProps, IWalletVisualState> {
  uniqueSvgUrlHash: string;
  static defaultProps: { size: number; };
  constructor(props: IWalletVisualProps) {
    super(props);
    this.uniqueSvgUrlHash = generateUniqueId();
  }

  shouldComponentUpdate(nextProps: any) {
    return (
      nextProps.isMediumViewPort !== this.props.isMediumViewPort ||
      nextProps.address !== this.props.address ||
      nextProps.placeholder !== this.props.placeholder
    );
  }

  computeShapesAndGradients(newSize: number) {
    const { address } = this.props;

    const addressHashChunks = getHashChunks(address);
    const gradientScheme =
      gradientSchemes[addressHashChunks[0].substring(1, 3) % gradientSchemes.length];

    const gradientsSchemesUrlsHashed = {
      primary: pickTwo(addressHashChunks[1], gradientScheme.primary).map(
        replaceUrlByHashOnScheme.bind(null, this.uniqueSvgUrlHash)
      ),
      secondary: pickTwo(addressHashChunks[2], gradientScheme.secondary).map(
        replaceUrlByHashOnScheme.bind(null, this.uniqueSvgUrlHash)
      ),
    };

    const shapes = [
      getBackgroundCircle(newSize, gradientsSchemesUrlsHashed.primary[0]),
      getShape(addressHashChunks[1], newSize, gradientsSchemesUrlsHashed.primary[1], 1),
      getShape(addressHashChunks[2], newSize, gradientsSchemesUrlsHashed.secondary[0], 0.23),
      getShape(addressHashChunks[3], newSize, gradientsSchemesUrlsHashed.secondary[1], 0.18),
    ];

    return [shapes, gradientsSchemesUrlsHashed];
  }

  render() {
    const { address, size, className, placeholder } = this.props;

    if (placeholder) {
      return (
        <span
          style={{ height: size, width: size, ...styles.placeholder }}
        />
      );
    }
    if (validateAddress(address) === 1 && !/^[1-9]\d{0,19}L$/.test(address)) {
      return null;
    }
    const [shapes, gradientsSchemesUrlsHashed] = this.computeShapesAndGradients(size);

    return (
      <div
        data-testid={`wallet-visual-${this.props.address}`}
        style={{ height: size, width: size, ...styles.wrapper }}
        className={className}
      >
        <svg height={size} width={size} style={{ ...styles.walletVisual }}>
          <Gradients scheme={gradientsSchemesUrlsHashed} disabled={this.props.disabled} />
          {shapes.map((shape: any, i: number) => (
            <shape.component {...shape.props} key={i} />
          ))}
        </svg>
      </div>
    );
  }
}

WalletVisual.defaultProps = {
  size: 40,
};

export default WalletVisual;
