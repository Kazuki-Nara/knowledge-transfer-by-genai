import { Injectable } from "@nestjs/common";
import { findMeetingById } from "./shared";

@Injectable()
export class AppService {
  async getMeeting(meetingId: string): Promise<any> {
    const meeting = await findMeetingById(meetingId);
    return meeting;
  }
}
