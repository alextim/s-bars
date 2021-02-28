import Utils from '../../lib/utils';

const weekDays = {
  mo: 'Monday',
  tu: 'Tuesday',
  we: 'Wednesday',
  th: 'Thursday',
  fr: 'Fryday',
  sa: 'Saturday',
  su: 'Sunday',
};

const getOpeningHours = (openingHours, dows) => {
  const parseDow = (s) => {
    if (!s) {
      return '';
    }
    const dow = s.split('-');
    if (dow.length === 1) {
      return dows[s];
    }
    return `${dows[dow[0]]}-${dows[dow[1]]}`;
  };
  const a = openingHours.reduce(
    (acc, [dow, timeStart, timeFinish]) =>
      `${acc}${acc ? ', ' : ''}${parseDow(dow)}: ${timeStart}-${timeFinish}`,
    '',
  );
  return a.length === 1 ? a[0] : a;
};

const getOpeningHoursSpecification = (openingHours) => {
  const parseDow = (s) => {
    if (!s) {
      return undefined;
    }

    let dow = s.split('-');
    if (dow.length > 1) {
      const d1 = dow[0];
      const d2 = dow[1];
      const keys = Object.keys(weekDays);
      const a = [];
      let first = false;
      let last = false;
      keys.forEach((d) => {
        if (d === d1) {
          first = true;
          a.push(weekDays[d]);
        } else if (d === d2) {
          last = true;
          a.push(weekDays[d]);
        } else if (first && !last) {
          a.push(weekDays[d]);
        }
      });
      return a;
    }

    dow = s.split(',');
    if (dow.length > 1) {
      return dow.map((d) => weekDays[d]);
    }
    return weekDays[s];
  };

  return openingHours.map(([dow, timeStart, timeFinish]) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: parseDow(dow),
    opens: timeStart,
    closes: timeFinish,
  }));
};

const getOrganizationSchema = ({
  organization,
  address = {},
  siteMeta,
  config,
  dows,
  homeURL,
  socialLinks,
}) => {
  const {
    organizationType,
    geo,
    openingHours,
    hasMap,
    priceRange,
    currenciesAccepted,
    paymentAccepted,
  } = organization;
  const { legalName, postalAddress, contactPoint } = address;
  const { siteTitle, siteTitleAlt, siteDescription } = siteMeta;

  const schema = {
    '@context': 'http://schema.org',
    '@type': organizationType,
    name: siteTitle,
    alternateName: siteTitleAlt,
    description: siteDescription,
    url: homeURL,
    logo: config.siteLogo,
  };
  if (config.siteBusinessPhoto) {
    schema.image = Array.isArray(config.siteBusinessPhoto)
      ? [...config.siteBusinessPhoto]
      : config.siteBusinessPhoto;
  }

  let postalAddressObj;
  if (postalAddress) {
    postalAddressObj = {
      '@type': 'PostalAddress',
      ...postalAddress,
      streetAddress: postalAddress.streetAddress && postalAddress.streetAddress.join(', '),
    };
    schema.address = postalAddressObj;
  }
  if (legalName) {
    schema.legalName = legalName;
  }

  if (postalAddressObj || geo) {
    schema.place = {
      '@type': 'Place',
    };

    if (address) {
      schema.place.address = postalAddressObj;
    }

    if (geo) {
      schema.place.geo = {
        '@type': 'GeoCoordinates',
        ...geo,
      };
    }
  }

  if (geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      ...geo,
    };
  }

  if (contactPoint) {
    schema.contactPoint = contactPoint.map(
      ({ name, contactType, telephone, email, areaServed }) => {
        const o = {
          '@type': 'ContactPoint',
          name,
          contactType,
        };
        if (telephone) {
          o.telephone = telephone.reduce(
            (acc, curr) => `${acc}${acc ? ', ' : ''}${Utils.formatPhone(curr)}`,
            '',
          );
        }
        if (email) {
          o.email = email.join();
        }
        if (areaServed) {
          o.areaServed = areaServed;
        }
        return o;
      },
    );
  } else {
    if (organization.email) {
      schema.email = organization.email.join();
    }
    if (organization.phone) {
      schema.telephone = organization.phone.join();
    }
  }

  if (socialLinks) {
    schema.sameAs = Object.keys(socialLinks).map((key) => socialLinks[key].to);
  }

  if (currenciesAccepted) {
    schema.currenciesAccepted = currenciesAccepted;
  }
  if (paymentAccepted) {
    schema.paymentAccepted = paymentAccepted;
  }
  if (priceRange) {
    schema.priceRange = priceRange;
  }

  if (Array.isArray(openingHours)) {
    if (dows) {
      schema.openingHours = getOpeningHours(openingHours, dows);
    }
    schema.OpeningHoursSpecification = getOpeningHoursSpecification(openingHours);
  }

  if (hasMap) {
    schema.hasMap = hasMap;
  }

  return schema;
};

export default getOrganizationSchema;
