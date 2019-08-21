import moment from 'moment';
import removeMd from 'remove-markdown';

export class ContentUtils {
    public static formatDate(date): string {
        return moment(date).format('ll');
    }

    public static formatDuration(durationInSeconds): string {
        const duration = moment.duration(durationInSeconds, 'seconds');
        const hours = duration.hours() ? `${duration.hours()} hr` : null;
        const minutes = duration.minutes() ? `${duration.minutes()} min` : null;
        const seconds = duration.seconds() ? `${duration.seconds()} sec` : null;
        return [hours, minutes, seconds].filter(Boolean).join(' ');
    }

    public static getImgixURL(imgurl): string {
        return imgurl.replace(`//images.ctfassets.net/${process.env.CONTENTFUL_SPACE_ID}/`, 'https://crds-media.imgix.net/');
    }

    public static removeMarkdown(markdown): string {
        return removeMd(markdown).trim();
    }
}
