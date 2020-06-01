import { startOfHour } from 'date-fns';
import Appointment from '../models/appointment';
import AppointmentsRepository from '../repository/AppointmentsRepository';
/**
 * Every service has only one method !
 *
 */

interface RequestDTO {
	date: Date;
	provider: string;
}

class CreateAppointmentService {
	private appointmentsRepository: AppointmentsRepository;

	constructor(appointmentsRepository: AppointmentsRepository) {
		this.appointmentsRepository = appointmentsRepository;
	}

	public execute({ date, provider }: RequestDTO): Appointment {
		const appointmentDate = startOfHour(date); // bussiness rules

		const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
			appointmentDate,
		);

		if (findAppointmentInSameDate) {
			throw Error('This Appointment is already booked.');
		}

		const appointment = this.appointmentsRepository.create({
			provider,
			date: appointmentDate,
		});

		return appointment;
	}
}

export default CreateAppointmentService;
